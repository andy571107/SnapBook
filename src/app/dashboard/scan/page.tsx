"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Loader2, ArrowLeft, FileDown, Trash2, ReceiptText, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card'; // 카드 컴포넌트 활용
import ReceiptForm, { ReceiptData } from '@/components/receipt/ReceiptForm';
import { downloadReceiptsToExcel } from '@/lib/excel';

export default function ScanPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<ReceiptData | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [todayList, setTodayList] = useState<ReceiptData[]>([]);

    // 로컬 스토리지에서 오늘 데이터 불러오기
    const loadTodayData = () => {
        const today = new Date().toISOString().split('T')[0];
        const storageKey = `receipts_${today}`;
        const existingData = localStorage.getItem(storageKey);
        if (existingData) {
            setTodayList(JSON.parse(existingData));
        } else {
            setTodayList([]);
        }
    };

    useEffect(() => {
        loadTodayData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            simulateAnalysis();
        };
        reader.readAsDataURL(file);
    };

    const simulateAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const dummyData: ReceiptData = {
                storeName: "현대마트",
                category: "식비",
                date: new Date().toISOString().split('T')[0],
                amount: 15200,
                vat: 1520
            };
            setResult(dummyData);
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleDownloadExcel = async () => { // <--- 여기에 async 추가
        if (todayList.length === 0) {
            alert("저장된 내역이 없습니다.");
            return;
        }
        try {
            await downloadReceiptsToExcel(todayList); // <--- 여기에 await 추가
        } catch (error) {
            console.error("다운로드/공유 실패:", error);
            // 사용자에게 에러를 알리고 싶다면 여기에 alert를 추가해도 좋습니다.
        }
    };

    const handleClearToday = () => {
        if (confirm("오늘 저장된 모든 내역을 삭제할까요?")) {
            const today = new Date().toISOString().split('T')[0];
            localStorage.removeItem(`receipts_${today}`);
            setTodayList([]);
        }
    };

    const handleSave = (finalData: ReceiptData) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const storageKey = `receipts_${today}`;
            const updatedList = [...todayList, finalData];
            
            localStorage.setItem(storageKey, JSON.stringify(updatedList));
            setTodayList(updatedList); // 상태 업데이트로 리스트 즉시 반영
            
            alert("저장되었습니다.");
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장 중 오류 발생");
        }
        setResult(null);
        setImage(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-32">
            {/* 상단 헤더 */}
            <div className="bg-white/80 supports-backdrop-filter:backdrop-blur-md px-4 py-4 flex items-center justify-between border-b sticky top-0 z-10 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold ml-2">영수증 촬영</h1>
                        <p className="text-[10px] text-blue-600 ml-2 font-semibold">TODAY: {todayList.length}건</p>
                    </div>
                </div>
                
                <div className="flex gap-1">
                    {todayList.length > 0 && (
                        <>
                            <Button variant="ghost" size="icon" onClick={handleClearToday} className="text-slate-400">
                                <Trash2 className="w-5 h-5" />
                            </Button>
                            <Button 
                                onClick={handleDownloadExcel}
                                className="bg-[#1E3A8A] text-white flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-md active:scale-95 transition-transform"
                            >
                                <Send className="w-4 h-4" /> {/* 아이콘 변경 */}
                                엑셀 전송 {/* 문구 변경 */}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col items-center max-w-150 mx-auto">
                {/* 1. 입력 영역 (촬영/분석/폼) */}
                {!image && !isAnalyzing && !result && (
                    <div className="w-full aspect-3/4 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center bg-white space-y-4 mb-10">
                        <div className="bg-blue-50 p-6 rounded-full">
                            <Camera className="w-12 h-12 text-[#1E3A8A]" />
                        </div>
                        <input type="file" accept="image/*" capture="environment" className="hidden" id="camera-input" onChange={handleFileChange} />
                        <Button className="bg-[#1E3A8A] text-white rounded-full px-8 h-12 text-lg font-bold shadow-lg" onClick={() => document.getElementById('camera-input')?.click()}>
                            영수증 촬영하기
                        </Button>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="w-full aspect-3/4 bg-white rounded-3xl flex flex-col items-center justify-center shadow-lg space-y-4 mb-10">
                        <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin" />
                        <p className="font-bold text-[#1E3A8A]">정보 분석 중...</p>
                    </div>
                )}

                {result && (
                    <div className="w-full mb-10">
                        <ReceiptForm data={result} onSave={handleSave} onCancel={() => { setResult(null); setImage(null); }} />
                    </div>
                )}

                {/* 2. 하단 리스트 영역 */}
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <ReceiptText className="w-5 h-5 text-slate-400" />
                        <h2 className="font-bold text-slate-700">오늘 저장된 목록</h2>
                    </div>

                    {todayList.length === 0 ? (
                        <div className="text-center py-10 bg-slate-100/50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-sm text-slate-400">아직 저장된 영수증이 없습니다.</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {[...todayList].reverse().map((item, idx) => (
                                <Card key={idx} className="border-none shadow-md bg-white! rounded-2xl overflow-hidden">
                                    <CardContent className="flex justify-between items-center p-4">
                                        <div className="space-y-1">
                                            {/* 계정과목(업종) - 더 선명한 색상으로 */}
                                            <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">{item.category}</p>
                                            {/* 가맹점명 - 진한 네이비/블랙 */}
                                            <p className="font-extrabold text-slate-900 text-base">{item.storeName}</p>
                                        </div>
                                        <div className="text-right">
                                            {/* 합계 금액 - 확실한 강조 */}
                                            <p className="font-black text-[#1E3A8A] text-lg">
                                                {(item.amount + item.vat).toLocaleString()}원
                                            </p>
                                            {/* 상세 내역 - 가독성 있는 회색 */}
                                            <p className="text-[10px] text-slate-500 font-medium">
                                                금액 {item.amount.toLocaleString()} | 부가세 {item.vat.toLocaleString()}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}