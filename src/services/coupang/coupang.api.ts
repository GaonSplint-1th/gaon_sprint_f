import { api } from '@/api';
import type { CoupangSearchParams, CoupangSearchResponse } from '@/types';

/** 쿠팡 상품 검색 */
export const searchCoupangProducts = (
  params: CoupangSearchParams,
): Promise<CoupangSearchResponse> =>
  api.get<CoupangSearchResponse>('/coupang/search', { params });
