import { useQuery } from '@tanstack/react-query';
import { searchCoupangProducts } from './coupang.api';
import type { CoupangSearchResponse } from '@/types';

/** 쿠팡 상품 검색 쿼리 */
export const useCoupangSearchQuery = (keyword: string, limit = 20) => {
  return useQuery<CoupangSearchResponse, Error>({
    queryKey: ['coupang', 'search', keyword, limit],
    queryFn: () => searchCoupangProducts({ keyword, limit }),
    enabled: keyword.trim().length > 0,
  });
};
