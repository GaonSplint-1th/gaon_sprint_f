import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type {
  IngredientRequestCreateRequest,
  UserIngredientsResponse,
  UserIngredientUpsertRequest,
} from '@/types';
import {
  addUserIngredient,
  createIngredientRequest,
  removeUserIngredient,
} from './ingredient.api';

/** 보유 식재료 추가/수정. 응답으로 온 전체 목록을 캐시에 그대로 반영한다. */
export const useAddUserIngredient = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserIngredientUpsertRequest) =>
      addUserIngredient(userId as string, body),
    onSuccess: (data) => {
      queryClient.setQueryData<UserIngredientsResponse>(
        queryKeys.ingredients.owned(userId as string),
        data,
      );
    },
  });
};

/** 보유 식재료 삭제. */
export const useRemoveUserIngredient = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ingredientId: number) =>
      removeUserIngredient(userId as string, ingredientId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.owned(userId as string),
      });
    },
  });
};

/** 마스터에 없는 식재료 등록 요청. */
export const useCreateIngredientRequest = () => {
  const userId = useUserId();
  return useMutation({
    mutationFn: (body: IngredientRequestCreateRequest) =>
      createIngredientRequest(userId as string, body),
  });
};
