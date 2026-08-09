import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type {
  CurrentMenuCreateRequest,
  CurrentMenuRegenerateRequest,
  DayOfWeek,
  MealType,
} from '@/types';
import {
  createCurrentMenu,
  deleteDish,
  regenerateCurrentMenu,
  rerollDish,
  updateDish,
} from './menu.api';

/** 특정 슬롯을 가리키는 변수 묶음. */
interface SlotVars {
  dayOfWeek: DayOfWeek;
  mealType: MealType;
}

/** 현재 식단 트리 전체(요일 포함)를 무효화한다. */
const useInvalidateCurrentMenu = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.currentMenu.root(userId ?? ''),
    });
};

/** 현재 식단 생성 (템플릿 등록). */
export const useCreateCurrentMenu = () => {
  const userId = useUserId();
  const invalidate = useInvalidateCurrentMenu();
  return useMutation({
    mutationFn: (body: CurrentMenuCreateRequest) =>
      createCurrentMenu(userId as string, body),
    onSuccess: () => void invalidate(),
  });
};

/** 식단 재생성. */
export const useRegenerateCurrentMenu = () => {
  const userId = useUserId();
  const invalidate = useInvalidateCurrentMenu();
  return useMutation({
    mutationFn: (body: CurrentMenuRegenerateRequest = {}) =>
      regenerateCurrentMenu(userId as string, body),
    onSuccess: () => void invalidate(),
  });
};

/** 식사 수정 (dish 교체). */
export const useUpdateDish = () => {
  const userId = useUserId();
  const invalidate = useInvalidateCurrentMenu();
  return useMutation({
    mutationFn: ({
      dayOfWeek,
      mealType,
      dishId,
    }: SlotVars & { dishId: number }) =>
      updateDish(userId as string, dayOfWeek, mealType, { dishId }),
    onSuccess: () => void invalidate(),
  });
};

/** 식사 삭제. */
export const useDeleteDish = () => {
  const userId = useUserId();
  const invalidate = useInvalidateCurrentMenu();
  return useMutation({
    mutationFn: ({ dayOfWeek, mealType }: SlotVars) =>
      deleteDish(userId as string, dayOfWeek, mealType),
    onSuccess: () => void invalidate(),
  });
};

/** 식사 새로고침. */
export const useRerollDish = () => {
  const userId = useUserId();
  const invalidate = useInvalidateCurrentMenu();
  return useMutation({
    mutationFn: ({ dayOfWeek, mealType }: SlotVars) =>
      rerollDish(userId as string, dayOfWeek, mealType),
    onSuccess: () => void invalidate(),
  });
};
