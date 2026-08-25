import { useContext } from 'react';
import { ErrorPopupContext } from '@/providers/ErrorPopupContext';

export const useErrorPopup = () => {
  const context = useContext(ErrorPopupContext);

  if (!context) {
    throw new Error(
      'useErrorPopup은 ErrorPopupProvider 내부에서만 사용할 수 있습니다.',
    );
  }

  return context;
};
