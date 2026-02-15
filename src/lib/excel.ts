import * as XLSX from 'xlsx';
import { ReceiptData } from '@/components/receipt/ReceiptForm';

/**
 * ReceiptData 배열을 받아 엑셀 파일로 내보내는 함수
 * 1순위: 모바일 시스템 공유 (카톡 전송, 파일 저장 등)
 * 2순위: 일반 다운로드 (PC 및 공유 미지원 환경)
 */
export const downloadReceiptsToExcel = async (data: ReceiptData[]): Promise<void> => {
  if (data.length === 0) return;

  try {
    // 1. 데이터 매핑
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

    // 3. 바이너리 데이터 변환 및 파일 객체 생성
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const today = new Date().toISOString().split('T')[0];
    const fileName = `영수증정리_${today}.xlsx`;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    const blob = new Blob([excelBuffer], { type: fileType });
    const file = new File([blob], fileName, { type: fileType });

    // 4. 환경 확인 (모바일 여부 및 공유 기능 지원 여부)
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 5. [모바일] 공유 기능(Web Share API) 시도
    if (isMobile && navigator.share) {
      try {
        // 공유 가능한지 확인 (파일 공유 지원 여부 체크)
        const dataToShare = {
          files: [file],
          title: '영수증 엑셀 전송',
          text: `${today}자 영수증 내역입니다.`,
        };

        try {
          // 파일 공유가 가능한지 묻지 않고 일단 share를 시도해봅니다.
          await navigator.share(dataToShare);
          return; 
        } catch (shareError) {
          // 여기서 에러가 나면 자연스럽게 아래의 다운로드 로직이 실행됩니다.
          console.log('공유 창 띄우기 실패:', shareError);
        }

      } catch (shareError) {
        console.log('공유 중단 또는 미지원:', shareError);
        // 에러가 나면 아래의 일반 다운로드 로직으로 자동 이관됩니다.
      }
    }

    // 6. [PC/공유실패] 일반 다운로드 처리
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // 스타일 숨김 처리 후 클릭
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // 메모리 정리
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 1000);

  } catch (globalError) {
    console.error('엑셀 생성 중 오류 발생:', globalError);
    alert('엑셀 생성 중 문제가 발생했습니다. 다른 브라우저에서 시도해 주세요.');
  }
};