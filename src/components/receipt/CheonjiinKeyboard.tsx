'use strict';

import React, { useState, useEffect } from 'react';
import { Delete, Space } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CheonjiinKeyboard({ onInput, onDelete, onClose, onSpace, initialMode = 'HANGUL' }: any) {
    const [mode, setMode] = useState(initialMode);

    useEffect(() => { setMode(initialMode); }, [initialMode]);

    const Key = ({ label, subLabel, onClick, className }: any) => (
        <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            className={cn(
                "h-16 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl active:bg-slate-100 shadow-sm transition-all",
                className
            )}
        >
            <span className="text-xl font-bold text-slate-800">{label}</span>
            {subLabel && <span className="text-[10px] text-slate-400 mt-0.5">{subLabel}</span>}
        </button>
    );

    return (
        // [수정] h-[320px]를 주어 강제로 공간을 확보합니다.
        <div className="w-full bg-slate-50 p-4 pb-10 h-80 flex flex-col">
            <div className="max-w-md mx-auto w-full flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-1 bg-slate-200 p-1 rounded-lg">
                        {['HANGUL', 'ENGLISH', 'NUMBER'].map((m) => (
                            <button key={m} onMouseDown={(e) => { e.preventDefault(); setMode(m); }}
                                className={cn("px-4 py-1.5 text-xs font-black rounded-md", mode === m ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500")}>
                                {m === 'HANGUL' ? '한글' : m === 'ENGLISH' ? 'ABC' : '123'}
                            </button>
                        ))}
                    </div>
                    <button onMouseDown={(e) => { e.preventDefault(); onClose(); }} className="text-emerald-700 font-bold text-sm px-4 py-2 bg-emerald-100 rounded-lg">완료</button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {mode === 'HANGUL' && (
                        <>
                            <Key label="ㅣ" onClick={() => onInput('ㅣ')} />
                            <Key label="·" subLabel="천" onClick={() => onInput('·')} />
                            <Key label="ㅡ" subLabel="지" onClick={() => onInput('ㅡ')} />
                            <Key label="ㄱㅋ" onClick={() => onInput('ㄱㅋ')} />
                            <Key label="ㄴㄹ" onClick={() => onInput('ㄴㄹ')} />
                            <Key label="ㄷㅌ" onClick={() => onInput('ㄷㅌ')} />
                            <Key label="ㅂㅍ" onClick={() => onInput('ㅂㅍ')} />
                            <Key label="ㅅㅎ" onClick={() => onInput('ㅅㅎ')} />
                            <Key label="ㅈㅊ" onClick={() => onInput('ㅈㅊ')} />
                            <Key label="ㅇㅁ" onClick={() => onInput('ㅇㅁ')} />
                            <Key label={<Space className="h-5 w-5" />} onClick={onSpace} />
                            <Key label={<Delete className="h-6 w-6" />} onClick={onDelete} className="bg-slate-100 border-none" />
                        </>
                    )}
                    {mode === 'NUMBER' && (
                        <>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <Key key={n} label={n} onClick={() => onInput(n.toString())} />)}
                            <div /> <Key label="0" onClick={() => onInput('0')} />
                            <Key label={<Delete className="h-6 w-6" />} onClick={onDelete} className="bg-slate-100 border-none" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}