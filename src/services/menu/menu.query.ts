import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import { getTodayDayOfWeek } from '@/utils/menu';
import type { DayOfWeek } from '@/types';
import { getCurrentMenu, getDayMenu } from './menu.api';

/** 현재 식단 상세. */
export const useCurrentMenu = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.currentMenu.root(userId ?? ''),
    queryFn: () => getCurrentMenu(userId as string),
    enabled: !!userId,
  });
};

/** 특정 요일의 식단. */
export const useDayMenu = (dayOfWeek: DayOfWeek) => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.currentMenu.day(userId ?? '', dayOfWeek),
    queryFn: () => getDayMenu(userId as string, dayOfWeek),
    enabled: !!userId,
  });
};

/** 오늘의 식단 (오늘 요일을 dayOfWeek 로 계산). */
export const useTodayMenu = () => useDayMenu(getTodayDayOfWeek());
