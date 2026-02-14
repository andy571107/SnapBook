import { NextResponse } from 'next/server';

export async function POST() {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const categories = ["식비", "자재비", "유류비", "비품", "접대비"];
    const stores = ["스타벅스", "GS25", "다이소", "형제철물", "SK주유소", "이마트", "쿠팡", "배달의민족"];

    const randomStore = stores[Math.floor(Math.random() * stores.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomAmount = Math.floor(Math.random() * 50) * 100 + 3000; // 3000 ~ 

    // Format date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    console.log("Mock AI Analysis Completed");

    return NextResponse.json({
        success: true,
        data: {
            id: Math.random().toString(36).substring(7),
            storeName: randomStore,
            category: randomCategory,
            date: today,
            amount: randomAmount,
            vat: 0, // 부가세 자동 계산 제거 (영수증에 명시되지 않은 경우 0으로 처리)
            items: [
                { name: "대표 품목", price: randomAmount }
            ]
        }
    });
}
