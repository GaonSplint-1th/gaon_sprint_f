/** 장보기 체크리스트 항목. */
export interface ShoppingListItem {
  shoppingListItemId: number;
  ingredientId: number;
  name: string;
  quantityGrams: number | null;
  isChecked: boolean;
  ingredientPriceId: number | null;
}

/** 장보기 체크리스트 응답. */
export interface ShoppingList {
  userId: string;
  items: ShoppingListItem[];
}

/** 장보기 항목 추가 입력 (같은 ingredientId 면 수량/가격만 갱신). */
export interface ShoppingListItemInput {
  ingredientId: number;
  ingredientPriceId?: number;
  quantityGrams: number;
}

/** 장보기 항목 추가 요청. */
export interface ShoppingListAddRequest {
  items: ShoppingListItemInput[];
}

/** 장보기 항목 체크/해제 요청. */
export interface ShoppingListItemCheckRequest {
  checked: boolean;
}
