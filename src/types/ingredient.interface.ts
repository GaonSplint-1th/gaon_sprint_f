/** 식재료 단건 */
export interface Ingredient {
  id: number;
  name: string;
  price: number;
  unit: string; // 예: "1kg", "500g", "1개"
}

/** 장바구니 아이템 (식재료 + 수량) */
export interface CartItem extends Ingredient {
  quantity: number;
}
