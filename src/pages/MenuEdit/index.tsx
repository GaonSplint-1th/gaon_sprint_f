import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@/components/icons';
import {
  useCurrentMenu,
  useDeleteDish,
  useRerollDish,
  useUpdateDish,
} from '@/services/menu';
import { useDishes } from '@/services/dish';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { getApiErrorMessage, getApiErrorStatus } from '@/api';
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
import * as s from '../Home/style.css';

/** 스와이프 목록에 채울 후보 요리 수. */
const DISH_OPTION_SIZE = 20;

const MenuEditPage = () => {
  const navigate = useNavigate();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(getTodayDayOfWeek());

  const currentMenu = useCurrentMenu();
  const dishes = useDishes({ activeOnly: true, size: DISH_OPTION_SIZE });
  const price = useWeeklyMenuPrice(currentMenu.data?.weeklyMenuId, dayOfWeek);

  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();
  const rerollDish = useRerollDish();

  const hasNoMenu = getApiErrorStatus(currentMenu.error) === 404;

  const day = currentMenu.data?.days.find((it) => it.dayOfWeek === dayOfWeek);
  const slots = useMemo(() => toMealSlots(day?.dishes), [day?.dishes]);

  /** 메뉴가 하나라도 채워진 요일 수 — 확정 버튼의 진행도. */
  const filledDays =
    currentMenu.data?.days.filter((it) => it.dishes.length > 0).length ?? 0;

  const options = dishes.data?.items ?? [];
  const isMutating =
    updateDish.isPending || deleteDish.isPending || rerollDish.isPending;

  const onError = (error: unknown) => window.alert(getApiErrorMessage(error));

  const costOf = (mealType: MealType): number | null =>
    price.data?.items.find((item) => item.mealType === mealType)?.cost ?? null;

  if (hasNoMenu) {
    return (
      <div className={s.screen}>
        <header className={s.pageTitle}>
          <button
            type="button"
            className={s.backButton}
            onClick={() => navigate('/recommend')}
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className={s.title}>식단 수정</h1>
        </header>
        <p className={s.planDescription}>
          현재 식단이 없습니다. 먼저 식단을 추천받아 선택해 주세요.
        </p>
        <button
          type="button"
          className={s.bottomButton}
          onClick={() => navigate('/recommend')}
        >
          식단 추천 받기
        </button>
      </div>
    );
  }

  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate('/recommend')}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={s.title}>식단 수정</h1>
        <span className={s.infoIcon}>i</span>
      </header>

      <h2 className={s.planTitle}>{currentMenu.data?.name ?? '식단'}</h2>
      <p className={s.planDescription}>
        좌우로 밀어 메뉴를 변경할 수 있습니다.
      </p>

      <div className={s.dateBar}>
        <button
          type="button"
          aria-label="이전 날짜"
          onClick={() => setDayOfWeek((value) => shiftDayOfWeek(value, -1))}
        >
          ‹
        </button>
        <strong>{formatDayLabel(dayOfWeek)}</strong>
        <button
          type="button"
          aria-label="다음 날짜"
          onClick={() => setDayOfWeek((value) => shiftDayOfWeek(value, 1))}
        >
          ›
        </button>
      </div>

      <div className={s.costBar}>
        {price.isLoading ? '계산 중…' : formatWon(price.data?.totalCost)}
      </div>

      <div className={s.editScroll}>
        <div className={s.swipeMeals} aria-busy={currentMenu.isLoading}>
          {slots.map(({ mealType, dish }) => (
            <MealEditCard
              key={mealType}
              mealType={mealType}
              dish={dish}
              cost={costOf(mealType)}
              options={options}
              disabled={isMutating}
              onPick={(dishId) =>
                updateDish.mutate({ dayOfWeek, mealType, dishId }, { onError })
              }
              onReroll={() =>
                rerollDish.mutate({ dayOfWeek, mealType }, { onError })
              }
              onDelete={() =>
                deleteDish.mutate({ dayOfWeek, mealType }, { onError })
              }
              onOpenRecipe={(dishId) => navigate(`/recipe/${dishId}`)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${s.bottomButton} ${filledDays === 0 ? s.disabledButton : ''}`}
        disabled={filledDays === 0}
        onClick={() => navigate('/')}
      >
        확정하기({filledDays}/7)
      </button>
    </div>
  );
};

interface MealEditCardProps {
  mealType: MealType;
  dish: MenuDish | null;
  cost: number | null;
  options: { dishId: number; dishName: string }[];
  disabled: boolean;
  onPick: (dishId: number) => void;
  onReroll: () => void;
  onDelete: () => void;
  onOpenRecipe: (dishId: number) => void;
}

const MealEditCard = ({
  mealType,
  dish,
  cost,
  options,
  disabled,
  onPick,
  onReroll,
  onDelete,
  onOpenRecipe,
}: MealEditCardProps) => {
  const detail = dish
    ? (formatCookingTime(dish.cookingTimeMinutes) ?? formatWon(cost))
    : '메뉴 없음';

  return (
    <article className={s.mealCard}>
      <div className={s.mealInfo}>
        <h3 className={s.mealTime}>{MEAL_LABELS[mealType]}</h3>

        <div className={s.menuSwipe} tabIndex={0} aria-label="메뉴 선택">
          <div className={s.menuSwipeTrack}>
            {options.map((option) => (
              <button
                type="button"
                key={option.dishId}
                disabled={disabled}
                className={`${s.menuOption} ${dish?.dishId === option.dishId ? s.activeMenuOption : ''}`}
                onClick={() => onPick(option.dishId)}
              >
                {option.dishName}
              </button>
            ))}
          </div>
        </div>

        <p className={s.mealDetail}>{detail}</p>

        <div>
          <button
            type="button"
            className={s.recipeButton}
            disabled={!dish}
            onClick={() => dish && onOpenRecipe(dish.dishId)}
          >
            레시피보기
          </button>
          <button
            type="button"
            className={s.recipeButton}
            disabled={disabled}
            onClick={onReroll}
          >
            다른 메뉴
          </button>
          <button
            type="button"
            className={s.recipeButton}
            disabled={disabled || !dish}
            onClick={onDelete}
          >
            비우기
          </button>
        </div>
      </div>
      <div className={s.recipePreview} aria-hidden="true">
        <span className={s.recipeIcon} />
      </div>
    </article>
  );
};

export default MenuEditPage;
