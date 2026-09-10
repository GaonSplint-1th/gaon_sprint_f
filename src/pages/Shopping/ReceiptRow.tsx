import { CheckIcon, CloseIcon } from '@/components/icons';
import { formatWon } from '@/utils/menu';
import {
  boughtGrams,
  formatGrams,
  formatUnit,
  lineTotal,
  packCount,
  usageRatio,
} from '@/utils/shopping';
import type { ShoppingListItem } from '@/types';
import * as s from './style.css';

interface ReceiptRowProps {
  item: ShoppingListItem;
  /** 이 재료가 들어가는 요리 이름. 가격 계산이 아직이면 빈 배열. */
  dishNames: string[];
  disabled?: boolean;
  onCheck: (checked: boolean) => void;
  onToggleSkip: () => void;
}

/** 남는 양에 따른 꼬리표. 40% 미만이면 집에 있는지 물어본다 — 이 화면이 하려는 말이다. */
const tagFor = (ratio: number | null, leftGrams: number) => {
  if (ratio == null) return null;
  if (ratio >= 0.8) return { variant: 'good' as const, text: '거의 다 써요' };
  if (ratio >= 0.4)
    return {
      variant: 'mid' as const,
      text: `${formatGrams(leftGrams)} 남아요`,
    };
  return {
    variant: 'waste' as const,
    text: `${formatGrams(leftGrams)} 남아요 · 집에 있나요?`,
  };
};

/**
 * 영수증 한 줄.
 *
 * 구매 단위와 사용량을 한 줄에 붙여 놓는 게 이 화면의 전부다.
 * 왼쪽 체크박스는 담았다는 표시, 오른쪽 `안 살래요` 는 집에 있어 안 산다는 표시다.
 */
const ReceiptRow = ({
  item,
  dishNames,
  disabled,
  onCheck,
  onToggleSkip,
}: ReceiptRowProps) => {
  const isChecked = item.status === 'CHECKED';
  const isSkipped = item.status === 'SKIPPED';

  const ratio = usageRatio(item.quantityGrams, item.unitGrams);
  const packs = packCount(item.quantityGrams, item.unitGrams);
  const bought = boughtGrams(item.quantityGrams, item.unitGrams);
  const leftGrams = (bought ?? 0) - (item.quantityGrams ?? 0);
  const tag = tagFor(ratio, Math.max(leftGrams, 0));
  const total = lineTotal(item.unitPrice, item.quantityGrams, item.unitGrams);

  // 한 단위로 모자라면 몇 개인지 붙인다 — 그래야 금액이 왜 그런지 읽힌다.
  const unitLabel = formatUnit(item.unitName, item.unitGrams);
  const buyLabel =
    unitLabel == null
      ? '구매 단위 미정'
      : packs > 1
        ? `${unitLabel} × ${packs}`
        : unitLabel;

  return (
    <div
      className={`${s.item} ${
        isChecked
          ? s.itemState.checked
          : isSkipped
            ? s.itemState.skipped
            : s.itemState.pending
      }`}
    >
      {isSkipped ? (
        <span className={s.markSkip} aria-hidden="true">
          <CloseIcon width={12} height={12} />
        </span>
      ) : (
        <label className={s.check}>
          <input
            type="checkbox"
            className={s.checkInput}
            checked={isChecked}
            disabled={disabled}
            onChange={(event) => onCheck(event.target.checked)}
            aria-label={`${item.name} 장바구니에 담음`}
          />
          <span className={s.checkBox} aria-hidden="true" />
          <CheckIcon className={s.checkMark} aria-hidden="true" />
        </label>
      )}

      <div>
        <div className={s.line1}>
          <span className={`${s.name} ${isSkipped ? s.struck : ''}`}>
            {item.name}
          </span>
          <span className={`${s.price} ${isSkipped ? s.struck : ''}`}>
            {total == null ? '가격 미정' : formatWon(total)}
          </span>
        </div>

        <div className={s.units}>
          <span className={s.unitBuy}>{buyLabel}</span>
          <span className={s.unitArrow} aria-hidden="true">
            →
          </span>
          <span className={s.unitUse}>
            {formatGrams(item.quantityGrams)} 사용
          </span>
          {ratio != null && (
            <>
              <span className={s.unitArrow} aria-hidden="true">
                ·
              </span>
              <span>{Math.round(ratio * 100)}%</span>
            </>
          )}
        </div>

        {/* 단위를 모르면 남는 양도 모른다. 막대를 그리지 않는다. */}
        {ratio != null && (
          <div
            className={s.bar}
            role="img"
            aria-label={`구매 단위의 ${Math.round(ratio * 100)}% 사용`}
          >
            <span className={s.barUse} style={{ width: `${ratio * 100}%` }} />
            <span
              className={s.barLeft}
              style={{ width: `${(1 - ratio) * 100}%` }}
            />
          </div>
        )}

        <div className={s.foot}>
          {tag ? (
            <span className={s.tag[tag.variant]}>
              <span className={s.tagDot} aria-hidden="true" />
              {tag.text}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            className={`${s.skipButton} ${isSkipped ? s.skipButtonUndo : ''}`}
            onClick={onToggleSkip}
            disabled={disabled}
          >
            {isSkipped ? '역시 살래요' : '안 살래요'}
          </button>
        </div>

        {dishNames.length > 0 && (
          <p className={s.usedIn}>
            쓰임 <b className={s.usedInNames}>{dishNames.join(' · ')}</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceiptRow;
