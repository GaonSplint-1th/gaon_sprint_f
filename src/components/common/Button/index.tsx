import type { ButtonHTMLAttributes } from 'react';
import * as s from './style.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** full — 폭 100%(361), half — 180. 기본 full. */
  size?: 'full' | 'half';
  tone?: 'primary' | 'neutral';
}

/**
 * 공용 버튼 (Component 15.svg).
 * 화면마다 버튼 스타일을 새로 만들지 말고 이 컴포넌트를 쓴다.
 */
const Button = ({
  size = 'full',
  tone = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  const classNames = [s.size[size], s.tone[tone], className]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classNames} {...props} />;
};

export default Button;
