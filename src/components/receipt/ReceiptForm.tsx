"use client";

import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface ReceiptData {
    storeName: string;
    category: string;
    date?: string;
    amount: number;
    vat: number;
}

const FIELD_LABELS: Record<string, string> = {
    storeName: '가맹점명',
    category: '계정과목',
    amount: '금액',
    vat: '부가세'
};

export default function ReceiptForm({ data, onSave, onCancel }: {
    data: ReceiptData | null,
    onSave: (d: ReceiptData) => void,
    onCancel: () => void
}) {
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    if (!data) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ReceiptData) => {
        const isNum = key === 'amount' || key === 'vat';
        if (!isNum) return; // 한글 분해 방지: 텍스트 필드는 건드리지 않음

        const el = e.target;
        const originalValue = el.value;
        const start = el.selectionStart ?? 0;

        const rawValue = originalValue.replace(/[^0-9]/g, '');
        const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        const digitsBefore = originalValue.slice(0, start).replace(/[^0-9]/g, '').length;
        el.value = formatted;

        let newPos = 0;
        let count = 0;
        for (let i = 0; i < formatted.length; i++) {
            if (count >= digitsBefore) break;
            if (/[0-9]/.test(formatted[i])) count++;
            newPos++;
        }
        el.setSelectionRange(newPos, newPos);
    };

    const handleSave = () => {
        const finalData: ReceiptData = {
            ...data,
            storeName: inputRefs.current.storeName?.value || '',
            category: inputRefs.current.category?.value || '',
            amount: Number(inputRefs.current.amount?.value.replace(/,/g, '')) || 0,
            vat: Number(inputRefs.current.vat?.value.replace(/,/g, '')) || 0,
        };
        onSave(finalData);
    };

    return (
        /* pb-32를 추가하여 키보드가 올라와도 버튼 아래에 여백을 확보하고, w-full로 꽉 채웁니다 */
        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4 pb-32 px-2">
            <Card className="w-full shadow-xl bg-white rounded-3xl overflow-hidden border-t-8 border-[#1E3A8A]">
                <CardHeader className="bg-slate-50 p-5">
                    <CardTitle className="text-[#1E3A8A] font-bold text-center">정보 수정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 bg-white!">
                    {(Object.keys(FIELD_LABELS) as Array<keyof typeof FIELD_LABELS>).map((key) => {
                        const isNum = key === 'amount' || key === 'vat';
                        const inputId = `receipt-${key}`;
                        const rawValue = data[key as keyof ReceiptData];
                        const displayValue = isNum 
                            ? Number(rawValue || 0).toLocaleString() 
                            : String(rawValue || '');

                        return (
                            <div key={key} className="space-y-1">
                                <label htmlFor={inputId} className="text-[11px] font-bold text-slate-400 ml-1 uppercase">
                                    {FIELD_LABELS[key]}
                                </label>
                                <Input
                                    id={inputId}
                                    name={key}
                                    ref={(el: HTMLInputElement | null) => { inputRefs.current[key] = el; }}
                                    defaultValue={displayValue}
                                    inputMode={isNum ? "numeric" : "text"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, key as keyof ReceiptData)}
                                    autoComplete="off"
                                    className="h-14 rounded-2xl border-2 text-black font-bold bg-white! border-slate-100 focus:border-[#1E3A8A] caret-[#1E3A8A]"
                                />
                            </div>
                        );
                    })}
                    
                    {/* 버튼 영역: CardContent 내부에 확실히 포함시키고 상단 여백(pt-6)을 주었습니다 */}
                    <div className="flex gap-3 pt-6">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-12 rounded-xl border-slate-200 text-slate-600 font-bold" 
                            onClick={onCancel}
                        >
                            취소
                        </Button>
                        <Button 
                            className="flex-1 h-12 bg-[#1E3A8A] text-white rounded-xl shadow-md font-bold hover:bg-[#152a61]" 
                            onClick={handleSave}
                        >
                            저장하기
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}