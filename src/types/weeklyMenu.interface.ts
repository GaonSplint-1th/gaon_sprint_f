import type { DayOfWeek, MealType } from './common.interface';

/** 템플릿 목록 항목. */
export interface WeeklyMenuSummary {
  weeklyMenuId: number;
  name: string;
  /** 식단 요약 문구. 백엔드가 저녁 메뉴 기준으로 자동 생성한다. */
  highlight: string | null;
  imageUrl: string | null;
  /** null 이면 기본(공개) 템플릿, 값이 있으면 유저 개인 템플릿. */
  ownerUserId: string | null;
  sourceWeeklyMenuId: number | null;
  /**
   * 예상 식비(원). 보유 식재료를 차감한 금액으로,
   * 가격 단건 조회(.../price)의 totalCost 와 같은 값이다.
   * 끼니가 비었거나 가격을 아는 재료가 없으면 0.
   */
  estimatedCost: number | null;
}

/** 공개 + 내 템플릿 목록 응답. */
export interface WeeklyMenuTemplates {
  items: WeeklyMenuSummary[];
}

/** 템플릿 상세의 한 끼 (요일별 식단 조회보다 정보가 적다). */
export interface WeeklyMenuDish {
  mealType: MealType;
  dishId: number;
  name: string;
}

/** 템플릿 상세의 하루치. */
export interface WeeklyMenuDetailDay {
  dayOfWeek: DayOfWeek;
  dishes: WeeklyMenuDish[];
}

/** 템플릿 상세. */
export interface WeeklyMenuDetail {
  weeklyMenuId: number;
  name: string;
  explanation: string | null;
  highlight: string | null;
  days: WeeklyMenuDetailDay[];
}

/** 내가 만들거나 수정한 개인 템플릿 목록 항목. */
export interface MyWeeklyMenuItem {
  weeklyMenuId: number;
  name: string;
  sourceWeeklyMenuId: number | null;
  createdAt: string;
}

/** 내 개인 템플릿 목록 응답. */
export interface MyWeeklyMenus {
  userId: string;
  items: MyWeeklyMenuItem[];
}

/* ── 식단 가격 계산 (GET .../weekly-menus/{id}/price) ─────────── */

/** 요리별 재료 가격 내역. */
export interface MenuPriceIngredient {
  ingredientId: number;
  ingredientName: string;
  category: string | null;
  requiredGrams: number | null;
  ownedGrams: number | null;
  pricedGrams: number | null;
  ingredientPriceId: number | null;
  source: string | null;
  sourceItemCode: string | null;
  regionName: string | null;
  marketName: string | null;
  unitName: string | null;
  unitGrams: number | null;
  price: number | null;
  unitPrice: number | null;
  cost: number | null;
  priceAvailable: boolean;
  refreshedAt: string | null;
}

/** 끼니별 가격 내역. */
export interface MenuPriceDish {
  dayOfWeek: DayOfWeek;
  mealType: MealType;
  dishId: number;
  dishName: string;
  servings: number | null;
  cookingTimeMinutes: number | null;
  cost: number;
  ingredients: MenuPriceIngredient[];
}

/** 식단 가격 계산 응답 (DB 저장 안 함). */
export interface MenuPrice {
  userId: string;
  weeklyMenuId: number;
  weeklyMenuName: string;
  dayOfWeek: DayOfWeek | null;
  totalCost: number;
  items: MenuPriceDish[];
}
