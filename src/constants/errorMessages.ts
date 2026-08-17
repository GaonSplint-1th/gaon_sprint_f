import type { ErrorPopupType } from '@/types';

interface ErrorPopupPreset {
  /** 피그마 디자인이 2줄 고정이라 '\n'으로 줄바꿈을 구분한다. */
  message: string;
  confirmText: string;
  cancelText?: string;
}

export const ERROR_POPUP_PRESETS: Record<ErrorPopupType, ErrorPopupPreset> = {
  API_ERROR: {
    message: '요청을 처리할 수 없습니다.\n잠시 후 다시 시도해 주세요.',
    confirmText: '확인',
  },
  NETWORK_ERROR: {
    message: '인터넷 연결이 끊어졌습니다.\n연결을 확인한 후 다시 시도해 주세요.',
    confirmText: '확인',
  },
  SERVER_UNAVAILABLE: {
    message: '서버 점검 중이거나 연결할 수 없습니다.\n잠시 후 다시 시도해 주세요.',
    confirmText: '확인',
  },
  UPDATE_REQUIRED: {
    message: '새로운 버전이 있습니다.\n원활한 이용을 위해 업데이트해 주세요.',
    confirmText: '업데이트',
    cancelText: '나중에',
  },
};

/**
 * axios 응답 인터셉터에서 status 코드로 팝업 타입을 1차 분기할 때 쓴다.
 * API 명세에 공통 에러 코드 필드가 아직 없어 status 값만으로 판별한다.
 */
export const mapStatusToErrorPopupType = (status: number): ErrorPopupType =>
  status === 503 ? 'SERVER_UNAVAILABLE' : 'API_ERROR';
