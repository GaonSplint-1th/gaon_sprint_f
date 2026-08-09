import { api } from '@/api';
import type { User } from '@/types';

/** 유저 단건 조회. */
export const getUser = (userId: string) =>
  api.get<User>(`/api/v1/users/${userId}`);
