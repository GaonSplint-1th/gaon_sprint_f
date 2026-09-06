import { RefreshIcon } from '@/components/icons';
import { formatWon } from '@/utils/menu';
import * as s from './style.css';

interface CostBarProps {
  cost: number | null | undefined;
  isLoading?: boolean;
  /** 없으면 새로고침 버튼을 숨긴다. */
  onRefresh?: () => void;
  /** 다시 계산하는 중이면 버튼을 잠그고 아이콘을 돌린다. */
  isRefreshing?: boolean;
}

/** 계산된 식비 표시줄. 홈과 식단 수정이 함께 쓴다. */
const CostBar = ({
  cost,
  isLoading,
  onRefresh,
  isRefreshing,
}: CostBarProps) => (
  <div className={s.bar}>
    <span className={s.amount}>{isLoading ? '계산 중…' : formatWon(cost)}</span>
    {onRefresh && (
      <button
        type="button"
        className={s.refreshButton}
        onClick={onRefresh}
        disabled={isLoading || isRefreshing}
        aria-label="식비 새로고침"
      >
        <RefreshIcon className={isRefreshing ? s.spinning : undefined} />
      </button>
    )}
  </div>
);

export default CostBar;
