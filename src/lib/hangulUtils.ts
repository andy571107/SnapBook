'use strict';

const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄴㅈ', 'ㄴㅎ', 'ㄷ', 'ㄹ', 'ㄹㄱ', 'ㄹㅁ', 'ㄹㅂ', 'ㄹㅅ', 'ㄹㅌ', 'ㄹㅍ', 'ㄹㅎ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const COMPLEX_VOWELS: Record<string, string> = { 'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ', 'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ', 'ㅡㅣ': 'ㅢ' };
const DOUBLE_CONS: Record<string, string> = { 'ㄱㄱ': 'ㄲ', 'ㄷㄷ': 'ㄸ', 'ㅂㅂ': 'ㅃ', 'ㅅㅅ': 'ㅆ', 'ㅈㅈ': 'ㅉ' };
// 겹받침 추가 (굵, 앉, 많 등)
const COMPLEX_JONGS: Record<string, string> = { 'ㄹㄱ': 'ㄹㄱ', 'ㄴㅈ': 'ㄴㅈ', 'ㄴㅎ': 'ㄴㅎ', 'ㄹㅁ': 'ㄹㅁ', 'ㄹㅂ': 'ㄹㅂ', 'ㄹㅅ': 'ㄹㅅ', 'ㄹㅌ': 'ㄹㅌ', 'ㄹㅍ': 'ㄹㅍ', 'ㄹㅎ': 'ㄹㅎ', 'ㅂㅅ': 'ㅄ' };

// lib/hangulUtils.ts 에 추가하거나 ReceiptForm 상단에 작성
export function disassembleHangul(text: string): string[] {
    const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const result: string[] = [];
    for (const char of text) {
        const code = char.charCodeAt(0) - 0xAC00;
        if (code > -1 && code < 11172) {
            const cho = Math.floor(code / 588);
            const jung = Math.floor((code % 588) / 28);
            const jong = code % 28;
            result.push(CHOSUNG[cho]);
            result.push(JUNGSUNG[jung]);
            if (jong > 0) result.push(JONGSUNG[jong]);
        } else {
            result.push(char);
        }
    }
    return result;
}

export function assembleHangul(chars: string[]): string {
    if (chars.length === 0) return '';
    let merged: string[] = [];
    for (let i = 0; i < chars.length; i++) {
        const cur = chars[i], nxt = chars[i+1];
        if (nxt && DOUBLE_CONS[cur + nxt]) { merged.push(DOUBLE_CONS[cur + nxt]); i++; }
        else if (nxt && COMPLEX_VOWELS[cur + nxt]) { merged.push(COMPLEX_VOWELS[cur + nxt]); i++; }
        else { merged.push(cur); }
    }

    let result = '';
    let lCho = -1, lJung = -1, lJong = 0;

    const flush = () => {
        if (lCho !== -1 || lJung !== -1) {
            if (lCho !== -1 && lJung !== -1) result += String.fromCharCode(0xAC00 + (lCho * 588) + (lJung * 28) + lJong);
            else if (lCho !== -1) result += CHO[lCho];
            else if (lJung !== -1) result += JUNG[lJung];
        }
        lCho = -1; lJung = -1; lJong = 0;
    };

    for (const c of merged) {
        const ci = CHO.indexOf(c), ji = JUNG.indexOf(c), joni = JONG.indexOf(c);
        if (ci !== -1) {
            if (lCho !== -1 && lJung !== -1) {
                if (lJong === 0 && joni !== -1) { lJong = joni; }
                else if (lJong !== 0 && COMPLEX_JONGS[JONG[lJong] + c]) { // 겹받침 처리
                    lJong = JONG.indexOf(COMPLEX_JONGS[JONG[lJong] + c]);
                } else { flush(); lCho = ci; }
            } else { if (lCho !== -1) flush(); lCho = ci; }
        } else if (ji !== -1) {
            if (lCho !== -1 && lJung === -1) { lJung = ji; }
            else if (lJong !== 0) {
                const prevJong = JONG[lJong]; lJong = 0; flush();
                lCho = CHO.indexOf(prevJong); lJung = ji;
            } else { flush(); lJung = ji; }
        } else { flush(); result += c; }
    }
    flush(); return result;
}