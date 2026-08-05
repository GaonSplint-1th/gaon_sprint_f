import type { Category, DictionaryItem } from '@/types';

export const CATEGORIES: Category[] = [
  { id: 'veg', label: '채소 · 과일' },
  { id: 'meat', label: '고기 · 해산물' },
  { id: 'dairy', label: '달걀 · 두부 · 유제품' },
  { id: 'grain', label: '곡류 · 면' },
  { id: 'sauce', label: '양념 · 소스' },
  { id: 'processed', label: '가공 · 간편식' },
  { id: 'etc', label: '기타' },
];

export const DICTIONARY: DictionaryItem[] = [
  { name: '양파', category: 'veg' },
  { name: '대파', category: 'veg' },
  { name: '애호박', category: 'veg' },
  { name: '감자', category: 'veg' },
  { name: '방울토마토', category: 'veg' },
  { name: '아롱사태', category: 'meat' },
  { name: '돼지고기 앞다리', category: 'meat' },
  { name: '닭가슴살', category: 'meat' },
  { name: '오징어', category: 'meat' },
  { name: '달걀', category: 'dairy' },
  { name: '부침용 두부', category: 'dairy' },
  { name: '모짜렐라 치즈', category: 'dairy' },
  { name: '우유', category: 'dairy' },
  { name: '백미', category: 'grain' },
  { name: '소면', category: 'grain' },
  { name: '칼국수면', category: 'grain' },
  { name: '고추장', category: 'sauce' },
  { name: '진간장', category: 'sauce' },
  { name: '굴소스', category: 'sauce' },
  { name: '만두', category: 'processed' },
  { name: '어묵', category: 'processed' },
  { name: '즉석밥', category: 'processed' },
  { name: '건미역', category: 'etc' },
  { name: '멸치 육수팩', category: 'etc' },
];
