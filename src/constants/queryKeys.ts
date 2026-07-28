/**
 * React Query 키를 한 곳에서 관리한다.
 * 팩토리 함수로 파라미터별 키를 안정적으로 생성.
 *
 * 예)
 * export const queryKeys = {
 *   user: {
 *     all: ['user'] as const,
 *     detail: (id: number) => [...queryKeys.user.all, id] as const,
 *   },
 * } as const;
 */
export const queryKeys = {} as const;
