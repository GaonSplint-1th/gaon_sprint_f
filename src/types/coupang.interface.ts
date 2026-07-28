/** 쿠팡 상품 검색 요청 파라미터 */
export interface CoupangSearchParams {
  keyword: string;
  limit?: number;
}

/** 쿠팡 상품 단건 */
export interface CoupangProduct {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productUrl: string;
}

/** 쿠팡 상품 검색 응답 */
export interface CoupangSearchResponse {
  products: CoupangProduct[];
}
