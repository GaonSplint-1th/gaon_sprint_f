import { useNavigate } from 'react-router-dom';
import { AppBar, Screen } from '@/components/layout';
import {
  Button,
  DateNavigator,
  MealCard,
  MealCardSkeleton,
} from '@/components/common';
import { getApiErrorStatus } from '@/api';
import { useDateNavigation } from '@/hooks/useDateNavigation';
import { useCurrentMenu } from '@/services/menu';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { MEAL_LABELS, MEAL_TYPES, toDayOfWeek } from '@/utils/menu';
import type { MealType, MenuDish } from '@/types';
import * as s from './style.css';

const formatWon = (value: number) => `${Math.round(value).toLocaleString()}원`;

/** 끼니 아래 보조 문구 — 가격이 계산되면 가격, 없으면 조리 시간. */
const buildDetail = (dish: MenuDish, cost?: number) => {
  if (cost != null) return `약 ${formatWon(cost)}`;
  if (dish.cookingTimeMinutes != null)
    return `조리 ${dish.cookingTimeMinutes}분`;
  return '';
};

const HomePage = () => {
  const navigate = useNavigate();
  const { date, label, goPrev, goNext } = useDateNavigation();
  const dayOfWeek = toDayOfWeek(date);

  // 세션 대기 중에는 쿼리가 비활성이라 isLoading 이 false 다. 데이터 유무를 뜻하는 isPending 을 쓴다.
  const { data: menu, isPending, isError, error } = useCurrentMenu();
  // 아직 식단을 안 만든 사용자는 404 가 온다 (에러가 아니라 빈 상태).
  const hasNoMenu = isError && getApiErrorStatus(error) === 404;

  const { data: price } = useWeeklyMenuPrice(menu?.weeklyMenuId, dayOfWeek);

  const day = menu?.days.find((item) => item.dayOfWeek === dayOfWeek);
  const dishByMeal = new Map<MealType, MenuDish>(
    day?.dishes.map((dish) => [dish.mealType, dish]),
  );
  const costByDish = new Map(
    price?.items.map((item) => [item.dishId, item.cost]),
  );

  return (
    <Screen
      bottomCta={
        <Button onClick={() => navigate('/recommend')}>
          {hasNoMenu ? '식단 만들기' : '식단 추천'}
        </Button>
      }
    >
      <AppBar title="오늘의 식단" />

      <DateNavigator label={label} onPrev={goPrev} onNext={goNext} />
      {price && <p className={s.costBar}>{formatWon(price.totalCost)}</p>}

      <section className={s.section} aria-labelledby="meal-section-title">
        <h2 id="meal-section-title" className={s.sectionTitle}>
          식사별 메뉴
        </h2>

        {isPending && !isError && (
          <div
            className={s.mealList}
            aria-busy="true"
            aria-label="식단을 불러오는 중"
          >
            {MEAL_TYPES.map((mealType) => (
              <MealCardSkeleton key={mealType} />
            ))}
          </div>
        )}

        {hasNoMenu && (
          <p className={s.message}>
            아직 식단이 없어요. 아래에서 식단을 만들어 보세요.
          </p>
        )}

        {!isPending && !isError && (
          <div className={s.mealList}>
            {MEAL_TYPES.map((mealType) => {
              const dish = dishByMeal.get(mealType);
              if (!dish) {
                return (
                  <MealCard
                    key={mealType}
                    time={MEAL_LABELS[mealType]}
                    name="메뉴가 비어 있어요"
                    detail=""
                  />
                );
              }
              return (
                <MealCard
                  key={mealType}
                  time={MEAL_LABELS[mealType]}
                  name={dish.name}
                  detail={buildDetail(dish, costByDish.get(dish.dishId))}
                  onRecipeClick={() => navigate(`/recipe/${dish.dishId}`)}
                />
              );
            })}
          </div>
        )}
      </section>
    </Screen>
  );
};

export default HomePage;
