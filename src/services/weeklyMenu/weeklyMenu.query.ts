import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type { DayOfWeek } from '@/types';
import {
  getMyWeeklyMenus,
  getWeeklyMenuDetail,
  getWeeklyMenuPrice,
  getWeeklyMenuTemplates,
} from './weeklyMenu.api';

/** 공개 + 내 템플릿 목록. */
export const useWeeklyMenuTemplates = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.weeklyMenus.templates(),
    queryFn: getWeeklyMenuTemplates,
    enabled: !!userId,
  });
};

/** 템플릿 상세. */
export const useWeeklyMenuDetail = (weeklyMenuId: number | undefined) => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.weeklyMenus.detail(weeklyMenuId ?? -1),
    queryFn: () => getWeeklyMenuDetail(weeklyMenuId as number),
    enabled: !!userId && weeklyMenuId != null,
  });
};

/** 내 개인 템플릿 목록. */
export const useMyWeeklyMenus = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.weeklyMenus.mine(userId ?? ''),
    queryFn: () => getMyWeeklyMenus(userId as string),
    enabled: !!userId,
  });
};

/** 식단 가격 계산. */
export const useWeeklyMenuPrice = (
  weeklyMenuId: number | undefined,
  dayOfWeek?: DayOfWeek,
) => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.weeklyMenus.price(
      userId ?? '',
      weeklyMenuId ?? -1,
      dayOfWeek,
    ),
    queryFn: () =>
      getWeeklyMenuPrice(userId as string, weeklyMenuId as number, dayOfWeek),
    enabled: !!userId && weeklyMenuId != null,
  });
};
