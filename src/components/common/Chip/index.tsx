import { CloseIcon } from '@/components/icons';
import * as s from './style.css';

interface ChipProps {
  label: string;
  onRemove?: () => void;
}

/** 선택된 항목 칩. onRemove 를 넘기면 우측에 삭제 버튼이 붙는다. */
const Chip = ({ label, onRemove }: ChipProps) => (
  <span className={s.chip}>
    {label}
    {onRemove && (
      <button
        type="button"
        className={s.removeButton}
        aria-label={`${label} 삭제`}
        onClick={onRemove}
      >
        <CloseIcon size={16} />
      </button>
    )}
  </span>
);

export default Chip;
