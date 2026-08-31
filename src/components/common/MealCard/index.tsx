import { NoteOutline } from '@/components/icons';
import * as s from './style.css';

interface MealCardProps {
  /** 아침 / 점심 / 저녁, 비어 있으면 미정 */
  time: string;
  /** 메뉴 이름 */
  name: string;
  /** 조리 25분 · 약 5,800원 등 보조 정보 */
  detail: string;
  /** 없으면 레시피보기를 누를 수 없다. */
  onOpenRecipe?: () => void;
}

/** 식사 카드. 오늘의 식단과 식단 수정이 같은 모양을 쓴다. */
const MealCard = ({ time, name, detail, onOpenRecipe }: MealCardProps) => (
  <article className={s.card}>
    <div className={s.info}>
      <h3 className={s.time}>{time}</h3>
      <p className={s.name}>{name}</p>
      <p className={s.detail}>{detail}</p>
      <button
        type="button"
        className={s.recipeButton}
        disabled={!onOpenRecipe}
        onClick={onOpenRecipe}
      >
        레시피보기
      </button>
    </div>
    <div className={s.preview} aria-hidden="true">
      <span className={s.previewIcon}>
        <NoteOutline size={34} color="currentColor" />
      </span>
    </div>
  </article>
);

export default MealCard;
