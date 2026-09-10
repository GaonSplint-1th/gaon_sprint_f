// 식단 화면 스타일이 아직 Home/style.css 에 모여 있다. 옮기는 건 별건으로 둔다.
import * as s from '@/pages/Home/style.css';

interface MealActionsProps {
  /** 스크린리더용 이름에 쓰는 끼니 라벨. 예) "아침" */
  mealLabel: string;
  disabled: boolean;
  onDelete: () => void;
  onChange: () => void;
}

/**
 * 카드 아래에 붙는 삭제 / 변경 바.
 *
 * 변경은 백엔드의 식사 새로고침(reroll)이라 같은 슬롯을 건드린다.
 * 요청이 도는 동안에는 두 버튼을 함께 잠가 중복 호출을 막는다.
 */
const MealActions = ({
  mealLabel,
  disabled,
  onDelete,
  onChange,
}: MealActionsProps) => (
  <div className={s.mealActions}>
    <button
      type="button"
      className={s.deleteAction}
      disabled={disabled}
      aria-label={`${mealLabel} 메뉴 삭제`}
      onClick={onDelete}
    >
      삭제
    </button>
    <button
      type="button"
      className={s.changeAction}
      disabled={disabled}
      aria-label={`${mealLabel} 메뉴 변경`}
      onClick={onChange}
    >
      변경
    </button>
  </div>
);

export default MealActions;
