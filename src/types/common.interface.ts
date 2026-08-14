/**
 * 도메인 공통 타입.
 * 백엔드 응답은 별도 래퍼 없이 각 리소스 형태 그대로 내려온다.
 * (실패 응답만 {@link ApiErrorBody} 형태로 통일되어 있다.)
 */

/** 끼니 구분. */
export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

/** 요일. 1=월 ... 7=일 (백엔드 daily_menu.day_of_week 기준). */
export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** 커서 없는 offset 페이지네이션 파라미터. */
export interface PageParams {
  page?: number;
  size?: number;
}

/** 페이지네이션 응답 공통 래퍼 (식재료/요리 목록 등). */
export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
}

/** 전역 예외 처리기가 내려주는 실패 응답 본문. */
export interface ApiErrorBody {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
