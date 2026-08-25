import type { DayOfWeek, MealType } from '@/types';

/** 끼니 순서 (화면 정렬 기준). */
export const MEAL_TYPES: readonly MealType[] = [
  'BREAKFAST',
  'LUNCH',
  'DINNER',
] as const;

/** 끼니 한글 라벨. */
export const MEAL_LABELS: Record<MealType, string> = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
};

/** 요일(1=월 ... 7=일) 한글 라벨. */
export const DAY_LABELS: Record<DayOfWeek, string> = {
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
  7: '일',
};

/** JS Date.getDay()(0=일)을 백엔드 요일(1=월 ... 7=일)로 변환한다. */
export const toDayOfWeek = (date: Date): DayOfWeek => {
  const jsDay = date.getDay();
  return (jsDay === 0 ? 7 : jsDay) as DayOfWeek;
};

/** 오늘 요일 (1=월 ... 7=일). */
export const getTodayDayOfWeek = (): DayOfWeek => toDayOfWeek(new Date());

/** "7/30(목)" 형태의 날짜 라벨 (Frame 62.svg 표기). */
export const formatDateLabel = (date: Date = new Date()): string =>
  `${date.getMonth() + 1}/${date.getDate()}(${DAY_LABELS[toDayOfWeek(date)]})`;
