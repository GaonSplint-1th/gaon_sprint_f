import { api } from '@/api';
import type { UserPreferences, UserPreferencesUpdateRequest } from '@/types';

/** 기본 정보(선호 음식) 조회. */
export const getPreferences = (userId: string) =>
  api.get<UserPreferences>(`/api/v1/users/${userId}/preferences`);

/** 기본 정보 입력/수정 — 선호 dish 목록 전체를 교체 저장한다. */
export const updatePreferences = (
  userId: string,
  body: UserPreferencesUpdateRequest,
) => api.put<UserPreferences>(`/api/v1/users/${userId}/preferences`, body);
