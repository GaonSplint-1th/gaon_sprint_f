import { forwardRef, type ButtonHTMLAttributes } from 'react';
import * as s from './style.css';

type BottomButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * 화면 하단 주요 버튼.
 * 비활성 모양을 disabled 속성에 묶어, 클래스를 따로 붙이지 않아도 되게 했다.
 */
const BottomButton = forwardRef<HTMLButtonElement, BottomButtonProps>(
  ({ className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={className ? `${s.bottom} ${className}` : s.bottom}
      {...rest}
    />
  ),
);
BottomButton.displayName = 'BottomButton';

export default BottomButton;
