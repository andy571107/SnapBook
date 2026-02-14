import * as XLSX from 'xlsx';
import { ReceiptData } from '@/components/receipt/ReceiptForm';

export const downloadReceiptsToExcel = async (data: ReceiptData[]): Promise<void> => {
  if (data.length === 0) return;

  const mappedData = data.map((item) => ({
    "계정과목": item.category,
    "가맹점명": item.storeName,
    "날짜": item.date || '-',
    "금액": item.amount,
    "부가세": item.vat,
    "합계": item.amount + item.vat
  }));

  const worksheet = XLSX.utils.json_to_sheet(mappedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "영수증목록");

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const today = new Date().toISOString().split('T')[0];
  const fileName = `영수증정리_${today}.xlsx`;
  
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });

  // --- 모바일 공유하기 로직 추가 ---
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: blob.type })] })) {
    try {
      const file = new File([blob], fileName, { type: blob.type });
      await navigator.share({
        files: [file],
        title: '영수증 엑셀 내보내기',
        text: `${today} 영수증 정리 파일입니다.`,
      });
      return; // 공유 성공 시 여기서 종료
    } catch (error) {
      console.log('공유 실패, 일반 다운로드로 전환:', error);
    }
  }

  // --- 기존 다운로드 로직 (PC 및 공유 미지원 브라우저용) ---
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 200);
};