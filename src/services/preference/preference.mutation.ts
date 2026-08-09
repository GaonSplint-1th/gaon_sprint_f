import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type { UserPreferences, UserPreferencesUpdateRequest } from '@/types';
import { updatePreferences } from './preference.api';

/** 선호 음식 수정. 응답을 캐시에 반영한다. */
export const useUpdatePreferences = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UserPreferencesUpdateRequest) =>
      updatePreferences(userId as string, body),
    onSuccess: (data) =>
      queryClient.setQueryData<UserPreferences>(
        queryKeys.user.preferences(userId ?? ''),
        data,
      ),
  });
};
