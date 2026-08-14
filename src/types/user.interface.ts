/** 유저 단건. */
export interface User {
  userId: string;
  userName: string;
  createdAt: string;
}

/** 선호 음식 (dish 기준). */
export interface PreferredFood {
  dishId: number;
  dishName: string;
}

/** 기본 정보(선호 음식) 조회 응답. */
export interface UserPreferences {
  userId: string;
  preferredFoods: PreferredFood[];
}

/** 기본 정보 입력/수정 요청 — 선호 dish 목록 전체 교체. */
export interface UserPreferencesUpdateRequest {
  preferredDishIds: number[];
}
