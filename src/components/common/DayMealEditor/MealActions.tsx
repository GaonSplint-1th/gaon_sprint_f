// 식단 화면 스타일이 아직 Home/style.css 에 모여 있다. 옮기는 건 별건으로 둔다.
import * as s from '@/pages/Home/style.css';

interface MealActionsProps {
  /** 스크린리더용 이름에 쓰는 끼니 라벨. 예) "아침" */
  mealLabel: string;
  /** 요청이 도는 동안 둘 다 잠근다. */
  isBusy: boolean;
  /** 이 끼니에 메뉴가 담겨 있는지. 비었으면 지울 것이 없다. */
  hasDish: boolean;
  onDelete: () => void;
  onChange: () => void;
}

/**
 * 카드 아래에 붙는 삭제 / 변경 바.
 *
 * 변경은 백엔드의 식사 새로고침(reroll)이라 같은 슬롯을 건드린다.
 * 요청이 도는 동안에는 두 버튼을 함께 잠가 중복 호출을 막는다.
 *
 * 두 버튼의 잠금 조건은 다르다. 삭제는 담긴 메뉴가 있어야 하지만, 변경은 빈 끼니에서도
 * 눌려야 한다 — 삭제를 되돌릴 유일한 길이기 때문이다. 화면에 "다시 담기"가 따로 없어서
 * 변경까지 잠그면 한 번 지운 끼니는 영영 비어 있게 된다.
 */
const MealActions = ({
  mealLabel,
  isBusy,
  hasDish,
  onDelete,
  onChange,
}: MealActionsProps) => (
  <div className={s.mealActions}>
    <button
      type="button"
      className={s.deleteAction}
      disabled={isBusy || !hasDish}
      aria-label={`${mealLabel} 메뉴 삭제`}
      onClick={onDelete}
    >
      삭제
    </button>
    <button
      type="button"
      className={s.changeAction}
      disabled={isBusy}
      aria-label={`${mealLabel} 메뉴 변경`}
      onClick={onChange}
    >
      변경
    </button>
  </div>
);

export default MealActions;
