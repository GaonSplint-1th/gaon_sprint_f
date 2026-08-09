import type { DayOfWeek, MealType } from './common.interface';

/** 식단의 한 끼 슬롯에 담긴 요리. */
export interface MenuDish {
  mealType: MealType;
  dishId: number;
  name: string;
  cookingTimeMinutes: number | null;
}

/** 하루치 식단 (요일 + 끼니별 요리). */
export interface MenuDay {
  dayOfWeek: DayOfWeek;
  dishes: MenuDish[];
}

/** 현재 식단 상세 (유저당 1개). */
export interface CurrentMenu {
  userId: string;
  weeklyMenuId: number;
  name: string;
  days: MenuDay[];
}

/** 요일별 식단 조회 응답. */
export interface DayMenu {
  userId: string;
  weeklyMenuId: number;
  dayOfWeek: DayOfWeek;
  dishes: MenuDish[];
}

/** 단일 식사 슬롯 조회/수정 응답. */
export interface MealSlot {
  userId: string;
  weeklyMenuId: number;
  dayOfWeek: DayOfWeek;
  mealType: MealType;
  dish: MenuDish;
}

/** 식사 새로고침(reroll) 응답. */
export interface MealReroll {
  userId: string;
  dayOfWeek: DayOfWeek;
  mealType: MealType;
  oldDishId: number;
  newDish: MenuDish;
}

/** 현재 식단 생성 요청 — 선택한 템플릿을 등록한다. */
export interface CurrentMenuCreateRequest {
  weeklyMenuId: number;
}

/** 식단 재생성 요청 — weeklyMenuId 를 주면 복제, 생략하면 자동 생성. */
export interface CurrentMenuRegenerateRequest {
  weeklyMenuId?: number;
  preferredDishIds?: number[];
}

/** 식사 수정 요청 — 슬롯의 dish 교체. */
export interface MealSlotUpdateRequest {
  dishId: number;
}
