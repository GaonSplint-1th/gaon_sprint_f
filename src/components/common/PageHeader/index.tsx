import { ArrowLeftIcon, InfoIcon } from '@/components/icons';
import * as s from './style.css';

interface PageHeaderProps {
  title: string;
  /** 없으면 뒤로가기 버튼을 숨긴다. */
  onBack?: () => void;
  /** 없으면 안내 버튼을 숨긴다. 동작 없는 버튼은 두지 않는다. */
  onInfo?: () => void;
}

/** 화면 상단 앱바. 홈처럼 뒤로가기가 없는 화면도 있어 둘 다 선택이다. */
const PageHeader = ({ title, onBack, onInfo }: PageHeaderProps) => (
  <header className={s.header}>
    {onBack ? (
      <button
        type="button"
        className={s.iconButton}
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <ArrowLeftIcon />
      </button>
    ) : (
      <span className={s.spacer} aria-hidden />
    )}
    <h1 className={s.title}>{title}</h1>
    {onInfo ? (
      <button
        type="button"
        className={s.infoButton}
        onClick={onInfo}
        aria-label={`${title} 안내 보기`}
      >
        <InfoIcon />
      </button>
    ) : (
      <span className={s.spacer} aria-hidden />
    )}
  </header>
);

export default PageHeader;
