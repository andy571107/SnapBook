'use strict';

import React from 'react';
import { Delete, Space, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
    mode: '한글' | 'ABC' | '123';
    onModeChange: (m: '한글' | 'ABC' | '123') => void;
    onInput: (key: string) => void;
    onDelete: () => void;
    onSpace: () => void;
    onClose: () => void;
}

export default function SimpleKeyboard({ mode, onModeChange, onInput, onDelete, onSpace, onClose }: Props) {
    const layouts: Record<string, string[][]> = {
        '한글': [
            ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
            ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
            ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ']
        ],
        'ABC': [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ],
        '123': [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['.', '0', '00']]
    };

    return (
        <div className="flex flex-col gap-2 p-3 bg-slate-300 rounded-t-3xl shadow-2xl border-t border-slate-400 select-none pb-8">
            <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex gap-1 bg-white/40 p-1 rounded-xl">
                    {(['한글', 'ABC', '123'] as const).map((m) => (
                        <Button 
                            key={m} 
                            onPointerDown={(e: React.PointerEvent) => { e.preventDefault(); onModeChange(m); }}
                            className={`h-9 px-4 text-xs font-bold rounded-lg ${mode === m ? 'bg-[#1E3A8A] text-white' : 'text-slate-600 bg-transparent'}`}
                        >
                            {m}
                        </Button>
                    ))}
                </div>
                <Button onClick={onClose} className="h-9 w-9 p-0 bg-slate-600 text-white rounded-full"><X size={18} /></Button>
            </div>

            <div className={mode === '123' ? 'grid grid-cols-3 gap-2 px-6' : 'flex flex-col gap-1'}>
                {layouts[mode].map((row: string[], i: number) => (
                    <div key={i} className="flex justify-center gap-1">
                        {row.map((key: string) => (
                            <Button 
                                key={key} 
                                onPointerDown={(e: React.PointerEvent) => { e.preventDefault(); onInput(key); }}
                                className="flex-1 min-w-8 h-12 text-lg font-bold bg-white! text-black rounded-lg shadow-sm border-b-2 border-slate-400 active:translate-y-0.5 active:border-b-0"
                            >
                                {key}
                            </Button>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 px-1 mt-1">
                <Button onPointerDown={(e: React.PointerEvent) => { e.preventDefault(); onSpace(); }} className="flex-1 h-12 bg-white! rounded-lg shadow border-b-2 border-slate-400"><Space size={20} className="mx-auto text-slate-400" /></Button>
                <Button onPointerDown={(e: React.PointerEvent) => { e.preventDefault(); onDelete(); }} className="w-20 h-12 bg-slate-100 text-slate-700 rounded-lg shadow border-b-2 border-slate-400"><Delete size={20} className="mx-auto" /></Button>
            </div>
        </div>
    );
}