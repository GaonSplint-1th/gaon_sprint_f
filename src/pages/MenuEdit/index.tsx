import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@/components/icons';
import { useCurrentMenu, useDeleteDish, useUpdateDish } from '@/services/menu';
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

/** 선택기에 채울 후보 요리 수. */
const DISH_OPTION_SIZE = 20;

const MenuEditPage = () => {
  const navigate = useNavigate();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(getTodayDayOfWeek());

  const currentMenu = useCurrentMenu();
  const dishes = useDishes({ activeOnly: true, size: DISH_OPTION_SIZE });
  const price = useWeeklyMenuPrice(currentMenu.data?.weeklyMenuId, dayOfWeek);

  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();

  const hasNoMenu = getApiErrorStatus(currentMenu.error) === 404;

  const day = currentMenu.data?.days.find((it) => it.dayOfWeek === dayOfWeek);
  const slots = useMemo(() => toMealSlots(day?.dishes), [day?.dishes]);

  /** 메뉴가 하나라도 채워진 요일 수 — 확정 버튼의 진행도. */
  const filledDays =
    currentMenu.data?.days.filter((it) => it.dishes.length > 0).length ?? 0;

  const options = dishes.data?.items ?? [];
  const isMutating = updateDish.isPending || deleteDish.isPending;

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
      <p className={s.planDescription}>스크롤하여 메뉴를 변경할 수 있습니다.</p>

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

/** 선택기 한 칸의 높이(px). 스타일의 menuOption/menuSwipe 높이와 같아야 한다. */
const OPTION_HEIGHT = 24;

/** 계획 없음을 뜻하는 항목. 고르면 해당 슬롯을 비운다. */
const UNSET_OPTION = { dishId: -1, dishName: '미정' } as const;

interface MealEditCardProps {
  mealType: MealType;
  dish: MenuDish | null;
  cost: number | null;
  options: { dishId: number; dishName: string }[];
  disabled: boolean;
  onPick: (dishId: number) => void;
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
  onDelete,
  onOpenRecipe,
}: MealEditCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number>(undefined);

  // 맨 위가 "미정" — 시안의 "식사 계획이 없다면 미정으로 선택" 을 이 자리로 받는다.
  const choices = useMemo(() => [UNSET_OPTION, ...options], [options]);
  const selectedIndex = Math.max(
    0,
    choices.findIndex((choice) => choice.dishId === (dish?.dishId ?? -1)),
  );

  // 서버 값이 바뀌면 스크롤 위치를 맞춘다(사용자가 굴리는 중에는 건드리지 않는다).
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    const target = selectedIndex * OPTION_HEIGHT;
    if (Math.abs(node.scrollTop - target) > 1) node.scrollTop = target;
  }, [selectedIndex]);

  /** 스냅이 멈춘 뒤에만 확정한다 — 굴리는 도중 모든 칸에 요청이 나가지 않도록. */
  const handleScroll = () => {
    const node = scrollRef.current;
    if (!node || disabled) return;
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const index = Math.round(node.scrollTop / OPTION_HEIGHT);
      const picked = choices[index];
      if (!picked || picked.dishId === (dish?.dishId ?? -1)) return;
      if (picked.dishId === UNSET_OPTION.dishId) onDelete();
      else onPick(picked.dishId);
    }, 160);
  };

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  const move = (delta: number) => {
    const node = scrollRef.current;
    if (!node) return;
    const next = Math.min(
      choices.length - 1,
      Math.max(0, selectedIndex + delta),
    );
    node.scrollTo({ top: next * OPTION_HEIGHT, behavior: 'smooth' });
  };

  return (
    <article className={s.mealCard}>
      <div className={s.mealInfo}>
        <h3 className={s.mealTime}>{MEAL_LABELS[mealType]}</h3>

        <div
          ref={scrollRef}
          className={s.menuSwipe}
          onScroll={handleScroll}
          tabIndex={0}
          role="listbox"
          aria-label={`${MEAL_LABELS[mealType]} 메뉴 선택`}
          aria-activedescendant={`meal-${mealType}-option-${selectedIndex}`}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              move(1);
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className={s.menuSwipeTrack}>
            {choices.map((choice, index) => (
              <span
                key={choice.dishId}
                id={`meal-${mealType}-option-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                className={`${s.menuOption} ${index === selectedIndex ? s.activeMenuOption : ''}`}
              >
                {choice.dishName}
              </span>
            ))}
          </div>
        </div>

        <p className={s.mealDetail}>
          {dish
            ? (formatCookingTime(dish.cookingTimeMinutes) ?? formatWon(cost))
            : ' '}
        </p>

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

export default MenuEditPage;
