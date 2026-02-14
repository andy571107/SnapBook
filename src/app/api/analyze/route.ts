import { NextResponse } from 'next/server';

// 지연(Sleep) 함수 (429 에러 방지용)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("GEMINI_API_KEY missing");

        // 1. 파일 받기
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

        // 2. 이미지 변환
        const arrayBuffer = await file.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        // 3. 모델 설정 (사용 가능한 최신 모델)
        const MODEL_ID = "gemini-2.5-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${apiKey}`;

        const prompt = `
            Analyze this receipt image and extract the following information in JSON format:
            - storeName: exact store name
            - category: Account Title (계정과목) - one of ["식비", "자재비", "유류비", "비품", "접대비", "공과금", "기타"]
            - date: date in YYYY-MM-DD format
            - amount: total amount (integer)
            - vat: VAT amount if stated, otherwise 0
            
            Return ONLY a valid JSON object.
        `;

        let result;
        let lastError;

        // 4. 재시도 로직 (429 에러 대응)
        for (let i = 0; i < 3; i++) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                { inlineData: { mimeType: file.type || "image/jpeg", data: base64Image } }
                            ]
                        }],
                        generationConfig: {
                            responseMimeType: "application/json",
                            temperature: 0.1
                        }
                    })
                });

                result = await response.json();
                if (!response.ok) {
                    if (response.status === 429 || response.status === 503) {
                        const waitTime = 2000 * (i + 1);
                        console.warn(`⚠️ Rate limit hit. Waiting ${waitTime}ms...`);
                        await sleep(waitTime);
                        continue;
                    }
                    throw new Error(result.error?.message || "API Error");
                }
                break; // 성공 시 루프 탈출
            } catch (error: any) {
                lastError = error;
                console.error(`Attempt ${i + 1} failed:`, error.message);
            }
        }

        if (!result || !result.candidates?.[0]) {
            throw lastError || new Error("Failed to get response from Gemini");
        }

        // 5. 데이터 파싱 및 조립 (★핵심 수정 구간)
        const responseText = result.candidates[0].content.parts[0].text;
        let parsedData = { storeName: "", category: "기타", date: "", amount: 0, vat: 0 };

        try {
            // 마크다운 제거 후 순수 JSON만 추출
            const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
            parsedData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("JSON Parsing failed, using raw text:", responseText);
        }

        // 6. 클라이언트(프론트엔드)가 기대하는 구조로 데이터 전송
        return NextResponse.json({
            success: true,
            data: {
                storeName: parsedData.storeName || "정보 없음",
                category: parsedData.category || "기타",
                date: parsedData.date || new Date().toISOString().split('T')[0],
                amount: Number(parsedData.amount) || 0,
                vat: Number(parsedData.vat) || 0,
                id: Math.random().toString(36).substring(7),
                confidence: 0.95
            }
        });

    } catch (error: any) {
        console.error("Final Route Error:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}