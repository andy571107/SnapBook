import * as XLSX from 'xlsx';
import { ReceiptData } from '@/components/receipt/ReceiptForm';

/**
 * ReceiptData 배열을 받아 엑셀 파일로 내보내는 함수
 * 모바일에서는 '공유하기(카톡 등)' 창을 띄우고, PC에서는 파일을 다운로드합니다.
 */
export const downloadReceiptsToExcel = async (data: ReceiptData[]): Promise<void> => {
  if (data.length === 0) return;

  // 1. 데이터 매핑 (한글 헤더 설정)
  const mappedData = data.map((item) => ({
    "계정과목": item.category,
    "가맹점명": item.storeName,
    "날짜": item.date || '-',
    "금액": item.amount,
    "부가세": item.vat,
    "합계": item.amount + item.vat
  }));

  // 2. 엑셀 워크북 생성
  const worksheet = XLSX.utils.json_to_sheet(mappedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "영수증목록");

  // 3. 바이너리 데이터 변환
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const today = new Date().toISOString().split('T')[0];
  const fileName = `영수증정리_${today}.xlsx`;
  
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });

  // 4. 모바일 기기인지 확인
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 5. 모바일 공유하기(Web Share API) 시도
  if (isMobile && navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], fileName, { type: blob.type });
      
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: '영수증 엑셀 전송',
          text: `${today}자 영수증 내역 파일입니다.`,
        });
        return; // 공유 창 띄우기 성공 시 여기서 함수 종료
      }
    } catch (error) {
      // 공유 취소 시 에러 로그만 남기고 일반 다운로드로 흐르게 함
      console.log('공유가 취소되었거나 지원되지 않아 다운로드로 전환합니다.');
    }
  }

  // 6. PC 환경 또는 공유 미지원 시 일반 다운로드 처리
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  document.body.appendChild(link);
  link.click();

  // 메모리 정리
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 500);
};