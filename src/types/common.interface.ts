/** 백엔드 공통 응답 래퍼 (프로젝트 규약에 맞게 수정). */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
