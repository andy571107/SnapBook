import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return NextResponse.json({ error: 'No API Key' });

        const genAI = new GoogleGenerativeAI(apiKey);

        // [수정 포인트] results 객체에 명시적 타입을 부여합니다.
        const results: Record<string, string> = {};

        try {
            // 참고: gemini-2.5-flash는 아직 존재하지 않는 모델명일 수 있습니다. (현재 1.5 또는 2.0 사용)
            const model1 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
            const res1 = await model1.generateContent("Hello");
            results["gemini-1.5-flash"] = "Success: " + (await res1.response).text();
        } catch (e: any) {
            results["gemini-1.5-flash"] = "Error: " + (e.message || String(e));
        }

        try {
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            const res2 = await model2.generateContent("Hello");
            results["gemini-pro"] = "Success: " + (await res2.response).text();
        } catch (e: any) {
            results["gemini-pro"] = "Error: " + (e.message || String(e));
        }

        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: String(error) });
    }
}