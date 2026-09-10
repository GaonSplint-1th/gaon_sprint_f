import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Screen } from '@/components/layout';
import {
  CostBar,
  DateNavigator,
  MealCard,
  PageHeader,
} from '@/components/common';
import { useDayMenu } from '@/services/menu';
import { useDishImages } from '@/services/dish';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { getApiErrorStatus } from '@/api';
import { ROUTES } from '@/constants';
import {
  MEAL_LABELS,
  formatCookingTime,
  formatDayLabel,
  formatWon,
  getTodayDayOfWeek,
  shiftDayOfWeek,
  toMealSlots,
} from '@/utils/menu';
import type { DayOfWeek, MealType } from '@/types';
import ReceiptEntry from './ReceiptEntry';
import * as s from './style.css';

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

  // 식단 응답에는 요리 이름만 있어 대표 이미지는 요리 상세에서 따로 받아 온다.
  const dishImages = useDishImages(slots.map(({ dish }) => dish?.dishId));

  // 아직 식단이 없으면 앱의 첫 화면인 식재료 등록으로 보낸다.
  // 여기서 식재료를 등록하고 식단을 만들어 오는 것이 정해진 진입 흐름이다.
  if (hasNoMenu) {
    return <Navigate to={ROUTES.INGREDIENT_REGISTER} replace />;
  }

  /** 끼니별 식비 (가격 계산 응답에서 해당 슬롯을 찾는다). */
  const costOf = (mealType: MealType): number | null =>
    price.data?.items.find((item) => item.mealType === mealType)?.cost ?? null;

  return (
    <Screen>
      <PageHeader title="오늘의 식단" />

      <DateNavigator
        label={formatDayLabel(dayOfWeek)}
        onPrev={() => setDayOfWeek((day) => shiftDayOfWeek(day, -1))}
        onNext={() => setDayOfWeek((day) => shiftDayOfWeek(day, 1))}
      />
      <CostBar
        cost={price.data?.totalCost}
        isLoading={price.isLoading}
        onRefresh={() => void price.refetch()}
        isRefreshing={price.isFetching}
      />

      <ReceiptEntry />

      <section className={s.mealSection} aria-labelledby="meal-section-title">
        <h2 id="meal-section-title" className={s.sectionTitle}>
          식사별 메뉴
        </h2>

        <div className={s.mealList} aria-busy={dayMenu.isLoading}>
          {slots.map(({ mealType, dish }) => (
            <MealCard
              key={mealType}
              time={MEAL_LABELS[mealType]}
              name={dish?.name ?? '미정'}
              // 조리 시간이 있으면 그 값을, 없으면 계산된 식비를 보조 정보로 보여준다.
              detail={
                dish
                  ? (formatCookingTime(dish.cookingTimeMinutes) ??
                    formatWon(costOf(mealType)))
                  : '메뉴 없음'
              }
              imageUrl={dish ? dishImages.images[dish.dishId] : null}
              isImageLoading={Boolean(dish) && dishImages.isLoading}
              onOpenRecipe={
                dish ? () => navigate(`/recipe/${dish.dishId}`) : undefined
              }
            />
          ))}
        </div>
      </section>
    </Screen>
  );
};

export default HomePage;
