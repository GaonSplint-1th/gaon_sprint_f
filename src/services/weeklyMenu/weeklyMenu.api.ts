import { api } from '@/api';
import type {
  DayOfWeek,
  MenuPrice,
  MyWeeklyMenus,
  WeeklyMenuDetail,
  WeeklyMenuTemplates,
} from '@/types';

/** 템플릿 목록 (공개 + 로그인 유저의 개인 템플릿). userId 는 토큰에서 채워진다. */
export const getWeeklyMenuTemplates = () =>
  api.get<WeeklyMenuTemplates>('/api/v1/weekly-menus');

/** 템플릿 상세. */
export const getWeeklyMenuDetail = (weeklyMenuId: number) =>
  api.get<WeeklyMenuDetail>(`/api/v1/weekly-menus/${weeklyMenuId}`);

/** 내가 만들거나 수정한 개인 템플릿 목록. */
export const getMyWeeklyMenus = (userId: string) =>
  api.get<MyWeeklyMenus>(`/api/v1/users/${userId}/weekly-menus`);

/** 식단 가격 계산 (DB 저장 안 함). dayOfWeek 를 주면 해당 요일만 계산. */
export const getWeeklyMenuPrice = (
  userId: string,
  weeklyMenuId: number,
  dayOfWeek?: DayOfWeek,
) =>
  api.get<MenuPrice>(
    `/api/v1/users/${userId}/weekly-menus/${weeklyMenuId}/price`,
    { params: dayOfWeek ? { dayOfWeek } : undefined },
  );
