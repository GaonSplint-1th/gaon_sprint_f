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

/** 이번 주(월요일 시작)에서 해당 요일의 실제 날짜를 구한다. */
export const dateOfDayOfWeek = (
  dayOfWeek: DayOfWeek,
  base: Date = new Date(),
): Date => {
  const date = new Date(base);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + (dayOfWeek - toDayOfWeek(base)));
  return date;
};

/** "7/30(목)" — 요일 번호만으로 이번 주 기준 날짜 라벨을 만든다. */
export const formatDayLabel = (dayOfWeek: DayOfWeek): string => {
  const date = dateOfDayOfWeek(dayOfWeek);
  return `${date.getMonth() + 1}/${date.getDate()}(${DAY_LABELS[dayOfWeek]})`;
};

/** 요일 이동 (1↔7 순환). */
export const shiftDayOfWeek = (
  dayOfWeek: DayOfWeek,
  delta: number,
): DayOfWeek => (((dayOfWeek - 1 + delta + 7) % 7) + 1) as DayOfWeek;

/** 끼니 슬롯을 아침/점심/저녁 순으로 정렬해 항상 3칸을 채운다(빈 슬롯은 null). */
export const toMealSlots = <T extends { mealType: MealType }>(
  dishes: readonly T[] | undefined,
): { mealType: MealType; dish: T | null }[] =>
  MEAL_TYPES.map((mealType) => ({
    mealType,
    dish: dishes?.find((dish) => dish.mealType === mealType) ?? null,
  }));

/** 원화 표기. null/undefined 면 표기 불가 문구를 돌려준다. */
export const formatWon = (value: number | null | undefined): string =>
  value == null ? '가격 정보 없음' : `${value.toLocaleString('ko-KR')}원`;

/** 조리 시간 표기. 없으면 undefined. */
export const formatCookingTime = (
  minutes: number | null | undefined,
): string | undefined => (minutes == null ? undefined : `조리 ${minutes}분`);
