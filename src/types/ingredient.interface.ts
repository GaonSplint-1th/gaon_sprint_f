/** 식재료 카테고리 */
export interface Category {
  id: string;
  label: string;
}

/** 자동완성 사전 항목 */
export interface DictionaryItem {
  name: string;
  category: string;
}
