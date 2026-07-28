import type { Ingredient } from '@/types';

/** 임시 목업 데이터 (추후 API 연동으로 교체) */
export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 1, name: '양파', price: 2500, unit: '1kg' },
  { id: 2, name: '대파', price: 3000, unit: '1단' },
  { id: 3, name: '감자', price: 4000, unit: '1kg' },
  { id: 4, name: '당근', price: 2800, unit: '1kg' },
  { id: 5, name: '돼지고기 목살', price: 9900, unit: '500g' },
  { id: 6, name: '계란', price: 6500, unit: '30구' },
  { id: 7, name: '두부', price: 1500, unit: '1모' },
  { id: 8, name: '애호박', price: 1800, unit: '1개' },
];
