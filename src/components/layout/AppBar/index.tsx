import type { ReactNode } from 'react';
import { ArrowLeftIcon, InfoIcon } from '@/components/icons';
import * as s from './style.css';

interface AppBarProps {
  title: string;
  /** 넘기면 좌측에 뒤로가기 버튼이 붙는다. */
  onBack?: () => void;
  /** 넘기면 우측에 안내(i) 버튼이 붙는다. */
  onInfo?: () => void;
  /** 안내 버튼 대신 다른 액션을 넣고 싶을 때. */
  right?: ReactNode;
}

/**
 * 화면 상단 App Bar (App Bar.svg).
 * 세 가지 변형(뒤로가기+제목 / 제목만 / 제목+우측 액션)을 prop 으로 커버한다.
 */
const AppBar = ({ title, onBack, onInfo, right }: AppBarProps) => {
  return (
    <header className={s.container}>
      {onBack && (
        <button
          type="button"
          className={s.iconButton}
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon />
        </button>
      )}

      <h1 className={s.title}>{title}</h1>

      {right}

      {!right && onInfo && (
        <button
          type="button"
          className={`${s.iconButton} ${s.infoButton}`}
          onClick={onInfo}
          aria-label="안내"
        >
          <InfoIcon />
        </button>
      )}
    </header>
  );
};

export default AppBar;
