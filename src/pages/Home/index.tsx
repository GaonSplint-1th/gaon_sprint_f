import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDayMenu } from '@/services/menu';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { getApiErrorStatus } from '@/api';
import {
  MEAL_LABELS,
  formatCookingTime,
  formatDayLabel,
  formatWon,
  getTodayDayOfWeek,
  shiftDayOfWeek,
  toMealSlots,
} from '@/utils/menu';
import type { DayOfWeek, MealType, MenuDish } from '@/types';
import * as s from './style.css';

interface MenuCardProps {
  mealType: MealType;
  dish: MenuDish | null;
  cost: number | null;
  onOpenRecipe: (dishId: number) => void;
}

const MenuCard = ({ mealType, dish, cost, onOpenRecipe }: MenuCardProps) => {
  // 조리 시간이 있으면 그 값을, 없으면 계산된 식비를 보조 정보로 보여준다.
  const detail = dish
    ? (formatCookingTime(dish.cookingTimeMinutes) ?? formatWon(cost))
    : '메뉴 없음';

  return (
    <article className={s.mealCard}>
      <div className={s.mealInfo}>
        <h3 className={s.mealTime}>{MEAL_LABELS[mealType]}</h3>
        <p className={s.mealName}>{dish?.name ?? '미정'}</p>
        <p className={s.mealDetail}>{detail}</p>
        <button
          type="button"
          className={s.recipeButton}
          disabled={!dish}
          onClick={() => dish && onOpenRecipe(dish.dishId)}
        >
          레시피보기
        </button>
      </div>
      <div className={s.recipePreview} aria-hidden="true">
        <span className={s.recipeIcon} />
      </div>
    </article>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(getTodayDayOfWeek());

  const dayMenu = useDayMenu(dayOfWeek);
  const price = useWeeklyMenuPrice(dayMenu.data?.weeklyMenuId, dayOfWeek);

  // 현재 식단이 아직 없으면 백엔드가 404 를 준다 — 에러가 아니라 빈 상태로 다룬다.
  const hasNoMenu = getApiErrorStatus(dayMenu.error) === 404;

  const slots = useMemo(
    () => toMealSlots(dayMenu.data?.dishes),
    [dayMenu.data?.dishes],
  );

  /** 끼니별 식비 (가격 계산 응답에서 해당 슬롯을 찾는다). */
  const costOf = (mealType: MealType): number | null =>
    price.data?.items.find((item) => item.mealType === mealType)?.cost ?? null;

  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <h1 className={s.title}>오늘의 식단</h1>
      </header>

      <div className={s.dateBar}>
        <button
          type="button"
          aria-label="이전 날짜"
          onClick={() => setDayOfWeek((day) => shiftDayOfWeek(day, -1))}
        >
          ‹
        </button>
        <strong>{formatDayLabel(dayOfWeek)}</strong>
        <button
          type="button"
          aria-label="다음 날짜"
          onClick={() => setDayOfWeek((day) => shiftDayOfWeek(day, 1))}
        >
          ›
        </button>
      </div>

      <div className={s.costBar}>
        {price.isLoading ? '계산 중…' : formatWon(price.data?.totalCost)}
      </div>

      <section className={s.mealSection} aria-labelledby="meal-section-title">
        <h2 id="meal-section-title" className={s.sectionTitle}>
          식사별 메뉴
        </h2>

        {hasNoMenu ? (
          <p className={s.mealDetail}>
            아직 등록된 식단이 없어요. 아래에서 식단을 추천받아 보세요.
          </p>
        ) : (
          <div className={s.mealList} aria-busy={dayMenu.isLoading}>
            {slots.map(({ mealType, dish }) => (
              <MenuCard
                key={mealType}
                mealType={mealType}
                dish={dish}
                cost={costOf(mealType)}
                onOpenRecipe={(dishId) => navigate(`/recipe/${dishId}`)}
              />
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        className={s.bottomButton}
        onClick={() => navigate('/recommend')}
      >
        식단 추천
      </button>
    </div>
  );
};

export default HomePage;
