/**
 * 백엔드 ingredient.category 를 화면 카테고리 그룹으로 접는다.
 *
 * 마스터 데이터에 한글 라벨('채소 · 과일')과 영문 enum('VEGETABLE')이 섞여 있어
 * 양쪽을 모두 받아 준다. 매칭되지 않으면 '기타'로 보낸다.
 */
const CATEGORY_ALIASES: Record<string, string> = {
  '채소 · 과일': 'veg',
  VEGETABLE: 'veg',
  FRUIT: 'veg',
  '고기 · 해산물': 'meat',
  MEAT: 'meat',
  SEAFOOD: 'meat',
  '달걀 · 두부 · 유제품': 'dairy',
  EGG: 'dairy',
  DAIRY: 'dairy',
  TOFU: 'dairy',
  '곡류 · 면': 'grain',
  GRAIN: 'grain',
  NOODLE: 'grain',
  '양념 · 소스': 'sauce',
  SAUCE: 'sauce',
  SEASONING: 'sauce',
  FERMENTED: 'sauce',
  '가공 · 간편식': 'processed',
  PROCESSED: 'processed',
};

/** 화면 카테고리 id (CATEGORIES 의 id 와 같은 값). */
export const toCategoryId = (category: string | null | undefined): string => {
  if (!category) return 'etc';
  return (
    CATEGORY_ALIASES[category] ?? CATEGORY_ALIASES[category.trim()] ?? 'etc'
  );
};
