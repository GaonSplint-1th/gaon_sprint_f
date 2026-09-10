/**
 * 영수증 한 줄의 상태.
 *
 * 담음(CHECKED)과 안 삼(SKIPPED)은 반대말이 아니다. 체크는 장바구니에 담았다는 진행이고,
 * 안 삼은 집에 이미 있어 살 필요가 없다는 제외다. 그래서 한 줄은 세 상태를 갖는다.
 */
export type ShoppingListItemStatus = 'PENDING' | 'CHECKED' | 'SKIPPED';

/** 영수증 한 줄. */
export interface ShoppingListItem {
  shoppingListItemId: number;
  ingredientId: number;
  name: string;
  /** 재료 분류. 마트 동선 순서로 묶는 데 쓴다. */
  category: string | null;
  /** 이 식단이 한 주 동안 쓰는 양. 보유 식재료를 빼지 않은 전량이다. */
  quantityGrams: number | null;
  status: ShoppingListItemStatus;
  ingredientPriceId: number | null;
  /**
   * 발행 시점에 복사해 둔 구매 단위 (`1망`, `1팩`).
   * 조인해서 읽지 않으므로 시세가 갱신돼도 영수증 금액은 그대로다.
   * 가격을 모르는 재료면 셋 다 null.
   */
  unitName: string | null;
  unitGrams: number | null;
  unitPrice: number | null;
}

/** 한 식단의 영수증 전체. */
export interface ShoppingList {
  userId: string;
  weeklyMenuId: number;
  items: ShoppingListItem[];
}

/** 영수증 발행 시 올리는 재료 한 건. */
export interface ShoppingListItemInput {
  ingredientId: number;
  ingredientPriceId?: number;
  quantityGrams: number;
}

/** 영수증 발행 요청 — 한 식단에 필요한 재료를 통째로 올린다. */
export interface ShoppingListAddRequest {
  weeklyMenuId: number;
  items: ShoppingListItemInput[];
}

/** 한 줄의 상태 변경 요청. */
export interface ShoppingListItemStatusRequest {
  status: ShoppingListItemStatus;
}
