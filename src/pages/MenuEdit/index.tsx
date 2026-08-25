import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Screen } from '@/components/layout';
import {
  Button,
  DateNavigator,
  MealCard,
  MealCardSkeleton,
} from '@/components/common';
import { useDateNavigation } from '@/hooks/useDateNavigation';
import { useCurrentMenu, useUpdateDish } from '@/services/menu';
import { useDishes } from '@/services/dish';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { MEAL_LABELS, MEAL_TYPES, toDayOfWeek } from '@/utils/menu';
import type { DishSummary, MealType, MenuDish } from '@/types';
import * as s from './style.css';

/** 한 주 7일 — 확정 진행도 표시에 쓴다. */
const TOTAL_DAYS = 7;
/** 메뉴 교체 후보로 함께 보여줄 요리 수. */
const CANDIDATE_SIZE = 10;

const formatWon = (value: number) => `${Math.round(value).toLocaleString()}원`;

const MenuEditPage = () => {
  const navigate = useNavigate();
  const { date, label, goPrev, goNext } = useDateNavigation();
  const dayOfWeek = toDayOfWeek(date);

  // 세션 대기 중에는 쿼리가 비활성이라 isLoading 이 false 다. isPending 으로 스켈레톤을 유지한다.
  const { data: menu, isPending } = useCurrentMenu();
  const { data: candidates } = useDishes({
    size: CANDIDATE_SIZE,
    activeOnly: true,
  });
  const { data: price } = useWeeklyMenuPrice(menu?.weeklyMenuId, dayOfWeek);
  const updateDish = useUpdateDish();

  /** 이번 세션에서 손댄 요일 (확정 진행도 표시용). */
  const [editedDays, setEditedDays] = useState<Set<number>>(new Set());

  const day = menu?.days.find((item) => item.dayOfWeek === dayOfWeek);
  const dishByMeal = new Map<MealType, MenuDish>(
    day?.dishes.map((dish) => [dish.mealType, dish]),
  );
  const costByDish = new Map(
    price?.items.map((item) => [item.dishId, item.cost]),
  );

  /** 현재 메뉴를 뺀 교체 후보들. 현재 메뉴는 칩 맨 앞에 따로 그린다. */
  const buildOptions = (current: MenuDish | undefined): DishSummary[] =>
    (candidates?.items ?? []).filter((dish) => dish.dishId !== current?.dishId);

  const replace = (mealType: MealType, dishId: number) => {
    updateDish.mutate({ dayOfWeek, mealType, dishId });
    setEditedDays((previous) => new Set(previous).add(dayOfWeek));
  };

  return (
    <Screen
      bottomCta={
        <Button
          disabled={editedDays.size === 0 || updateDish.isPending}
          onClick={() => navigate('/')}
        >
          확정하기({editedDays.size}/{TOTAL_DAYS})
        </Button>
      }
    >
      <AppBar
        title="식단 수정"
        onBack={() => navigate('/recommend')}
        onInfo={() => undefined}
      />

      <div>
        <h2 className={s.planTitle}>{menu?.name ?? '식단'}</h2>
        <p className={s.planDescription}>
          좌우로 밀어 메뉴를 변경할 수 있습니다.
        </p>
      </div>

      <DateNavigator label={label} onPrev={goPrev} onNext={goNext} />
      {price && <p className={s.costBar}>{formatWon(price.totalCost)}</p>}

      {isPending ? (
        <div
          className={s.mealList}
          aria-busy="true"
          aria-label="식단을 불러오는 중"
        >
          {MEAL_TYPES.map((mealType) => (
            <MealCardSkeleton key={mealType} />
          ))}
        </div>
      ) : (
        <div className={s.mealList}>
          {MEAL_TYPES.map((mealType) => {
            const current = dishByMeal.get(mealType);
            const cost = current && costByDish.get(current.dishId);

            return (
              <MealCard
                key={mealType}
                time={MEAL_LABELS[mealType]}
                detail={
                  cost != null
                    ? `약 ${formatWon(cost)}`
                    : current?.cookingTimeMinutes != null
                      ? `조리 ${current.cookingTimeMinutes}분`
                      : ''
                }
                onRecipeClick={
                  current
                    ? () => navigate(`/recipe/${current.dishId}`)
                    : undefined
                }
                name={
                  <div
                    className={s.menuSwipe}
                    role="group"
                    aria-label={`${MEAL_LABELS[mealType]} 메뉴 선택`}
                  >
                    <div className={s.menuSwipeTrack}>
                      {current && (
                        <button
                          type="button"
                          className={`${s.menuOption} ${s.menuOptionActive}`}
                          aria-pressed
                        >
                          {current.name}
                        </button>
                      )}
                      {buildOptions(current).map((dish) => (
                        <button
                          key={dish.dishId}
                          type="button"
                          className={s.menuOption}
                          aria-pressed={false}
                          onClick={() => replace(mealType, dish.dishId)}
                        >
                          {dish.dishName}
                        </button>
                      ))}
                    </div>
                  </div>
                }
              />
            );
          })}
        </div>
      )}
    </Screen>
  );
};

export default MenuEditPage;
