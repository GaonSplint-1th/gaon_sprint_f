import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ReceiptIcon } from '@/components/icons';
import { ROUTES } from '@/constants';
import { useShoppingList } from '@/services/shopping';
import * as s from './style.css';

/**
 * 홈에서 이번 주 영수증으로 들어가는 자리.
 *
 * 담은 개수와 안 사기로 한 개수를 항상 들고 있어, 마트에서 나온 뒤에도
 * 무엇을 안 샀는지 여기서 바로 보인다.
 * 아직 영수증을 뽑지 않았으면(404 이거나 항목 0) 아무것도 그리지 않는다 —
 * 영수증은 식단을 7일 다 확정할 때 나온다.
 */
const ReceiptEntry = () => {
  const navigate = useNavigate();
  const shoppingList = useShoppingList();

  const items = shoppingList.data?.items ?? [];
  if (items.length === 0) return null;

  const buying = items.filter((item) => item.status !== 'SKIPPED');
  const checked = items.filter((item) => item.status === 'CHECKED');
  const skipped = items.filter((item) => item.status === 'SKIPPED');
  const ratio = buying.length ? (checked.length / buying.length) * 100 : 0;

  return (
    <button
      type="button"
      className={s.receiptCard}
      onClick={() => navigate(ROUTES.SHOPPING)}
    >
      <span className={s.receiptTile} aria-hidden="true">
        <ReceiptIcon />
      </span>
      <span className={s.receiptBody}>
        <span className={s.receiptTitle}>이번 주 장보기 영수증</span>
        <span className={s.receiptSub}>
          재료 {items.length}종 · 담음 {checked.length}
          {skipped.length > 0 && (
            <>
              {' · '}
              <span className={s.receiptSkipped}>안 삼 {skipped.length}</span>
            </>
          )}
        </span>
        <span className={s.receiptTrack}>
          <span className={s.receiptFill} style={{ width: `${ratio}%` }} />
        </span>
      </span>
      {/* 목록의 뒤로가기 화살표를 뒤집어 '들어간다'는 방향으로 쓴다. */}
      <ArrowLeftIcon
        className={s.receiptGo}
        style={{ transform: 'rotate(180deg)' }}
      />
    </button>
  );
};

export default ReceiptEntry;
