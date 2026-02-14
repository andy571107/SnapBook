"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileSpreadsheet } from "lucide-react";

export default function HistoryPage() {
    const handleExport = () => {
        alert("2월 영수증 데이터가 'Excel'로 다운로드 되었습니다.\n(Mock 기능입니다)");
    };

    const historyData = [
        { date: "2024-02-03", store: "스타벅스 강남점", category: "식비", amount: "12,500" },
        { date: "2024-02-02", store: "형제철물", category: "자재비", amount: "145,000" },
        { date: "2024-02-01", store: "GS칼텍스", category: "유류비", amount: "50,000" },
        { date: "2024-01-31", store: "이마트", category: "비품", amount: "32,800" },
        { date: "2024-01-30", store: "쿠팡", category: "비품", amount: "18,900" },
        { date: "2024-01-29", store: "배달의민족", category: "식비", amount: "22,000" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight">영수증 내역</h2>
                <Button onClick={handleExport} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel 내보내기
                </Button>
            </div>

            <Card className="mb-20">
                <CardHeader>
                    <CardTitle>2024년 2월</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-slate-100 text-sm font-bold text-slate-900 text-center">
                            <div>날짜</div>
                            <div>업체</div>
                            <div>계정과목</div>
                            <div>금액</div>
                        </div>
                        {historyData.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 text-sm items-center text-center">
                                <div className="text-muted-foreground text-xs sm:text-sm">{item.date}</div>
                                <div className="font-medium truncate">{item.store}</div>
                                <div className="text-muted-foreground hidden sm:block">{item.category}</div>
                                <div className="text-muted-foreground sm:hidden text-xs">{item.category}</div>
                                <div className="font-bold">₩{item.amount}</div>
                            </div>
                        ))}
                    </div>
                    {/* Spacer for bottom visibility */}
                    <div className="h-20" aria-hidden="true" />
                </CardContent>
            </Card>
        </div>
    );
}
