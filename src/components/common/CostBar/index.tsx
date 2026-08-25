import { formatWon } from '@/utils/menu';
import * as s from './style.css';

interface CostBarProps {
  cost: number | null | undefined;
  isLoading?: boolean;
}

/** 계산된 식비 표시줄. 홈과 식단 수정이 함께 쓴다. */
const CostBar = ({ cost, isLoading }: CostBarProps) => (
  <div className={s.bar}>{isLoading ? '계산 중…' : formatWon(cost)}</div>
);

export default CostBar;
