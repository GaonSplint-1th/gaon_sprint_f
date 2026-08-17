import { api } from '@/api';
import type {
  CurrentMenu,
  CurrentMenuCreateRequest,
  CurrentMenuRegenerateRequest,
  DayOfWeek,
  DayMenu,
  MealReroll,
  MealSlot,
  MealSlotUpdateRequest,
  MealType,
} from '@/types';

const base = (userId: string) => `/api/v1/users/${userId}/current-menu`;
const slot = (userId: string, dayOfWeek: DayOfWeek, mealType: MealType) =>
  `${base(userId)}/days/${dayOfWeek}/dishes/${mealType}`;

/** 현재 식단 상세 조회 (유저당 1개, 없으면 404). */
export const getCurrentMenu = (userId: string) =>
  api.get<CurrentMenu>(base(userId));

/** 요일별 식단 조회. 오늘 식단은 오늘 요일을 dayOfWeek 로 계산해 호출한다. */
export const getDayMenu = (userId: string, dayOfWeek: DayOfWeek) =>
  api.get<DayMenu>(`${base(userId)}/days/${dayOfWeek}`);

/** 현재 식단 생성 — 선택한 템플릿을 등록한다 (첫 편집 시 개인 사본 생성). */
export const createCurrentMenu = (
  userId: string,
  body: CurrentMenuCreateRequest,
) => api.post<CurrentMenu>(base(userId), body);

/** 식단 재생성 — 템플릿 복제 또는 자동 생성으로 현재 식단을 갈아끼운다. */
export const regenerateCurrentMenu = (
  userId: string,
  body: CurrentMenuRegenerateRequest = {},
) => api.post<CurrentMenu>(`${base(userId)}/regenerate`, body);

/** 식사 수정 — 슬롯의 dish 교체 (공개 템플릿이면 copy-on-write 선행). */
export const updateDish = (
  userId: string,
  dayOfWeek: DayOfWeek,
  mealType: MealType,
  body: MealSlotUpdateRequest,
) => api.put<MealSlot>(slot(userId, dayOfWeek, mealType), body);

/** 식사 삭제 — 슬롯만 비운다 (dish 마스터는 유지). */
export const deleteDish = (
  userId: string,
  dayOfWeek: DayOfWeek,
  mealType: MealType,
) => api.delete<void>(slot(userId, dayOfWeek, mealType));

/** 식사 새로고침 — 현재와 다른 dish 로 교체한다. */
export const rerollDish = (
  userId: string,
  dayOfWeek: DayOfWeek,
  mealType: MealType,
) => api.post<MealReroll>(`${slot(userId, dayOfWeek, mealType)}/reroll`);
