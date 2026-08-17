import { createContext } from 'react';
import type { ErrorPopupOptions } from '@/types';

export interface ErrorPopupContextValue {
  showError: (options: ErrorPopupOptions) => void;
  hideError: () => void;
}

export const ErrorPopupContext = createContext<ErrorPopupContextValue | null>(
  null,
);
