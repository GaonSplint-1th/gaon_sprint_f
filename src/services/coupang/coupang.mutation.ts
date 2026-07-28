import { useMutation } from '@tanstack/react-query';
import { searchCoupangProducts } from './coupang.api';
import type { CoupangSearchParams, CoupangSearchResponse } from '@/types';

/** 쿠팡 상품 검색 mutation */
export const useCoupangSearchMutation = () => {
  return useMutation<CoupangSearchResponse, Error, CoupangSearchParams>({
    mutationFn: (params) => searchCoupangProducts(params),
  });
};
