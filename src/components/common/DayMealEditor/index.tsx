import { useMemo, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import CostBar from '../CostBar';
import DateNavigator from '../DateNavigator';
import MealCard from '../MealCard';
import MealActions from './MealActions';
import { useDeleteDish, useRerollDish } from '@/services/menu';
import { useDishImages } from '@/services/dish';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { showApiErrorPopup } from '@/api';
import {
  MEAL_LABELS,
  formatCookingTime,
  formatDayLabel,
  formatWon,
  toMealSlots,
} from '@/utils/menu';
import type { DayOfWeek, MealType, MenuDay } from '@/types';
// 식단 화면 스타일이 아직 Home/style.css 에 모여 있다. 옮기는 건 별건으로 둔다.
import * as s from '@/pages/Home/style.css';

interface DayMealEditorProps {
  weeklyMenuId: number | undefined;
  days: MenuDay[] | undefined;
  isLoading?: boolean;
  dayOfWeek: DayOfWeek;
  onShiftDay: (delta: number) => void;
  /** 온보딩 안내가 짚어 줄 요소들. */
  prevDayRef?: RefObject<HTMLButtonElement | null>;
  mealsRef?: RefObject<HTMLDivElement | null>;
}

/**
 * 하루치 식단을 보고 고치는 영역.
 *
 * 날짜 이동 · 식비 · 세 끼니 카드와 삭제/변경까지가 한 덩어리다.
 * 식단 작성(확정하기 n/7)과 식단 수정(수정 완료)은 위아래 껍데기만 다르고
 * 이 안쪽은 똑같아서, 두 화면이 같은 것을 보도록 여기 모아 둔다.
 */
const DayMealEditor = ({
  weeklyMenuId,
  days,
  isLoading,
  dayOfWeek,
  onShiftDay,
  prevDayRef,
  mealsRef,
}: DayMealEditorProps) => {
  const navigate = useNavigate();
  const price = useWeeklyMenuPrice(weeklyMenuId, dayOfWeek);
  const deleteDish = useDeleteDish();
  const rerollDish = useRerollDish();

  const day = days?.find((it) => it.dayOfWeek === dayOfWeek);
  const slots = useMemo(() => toMealSlots(day?.dishes), [day?.dishes]);

  // 식단 응답에는 요리 이름만 있어 대표 이미지는 요리 상세에서 따로 받아 온다.
  const dishImages = useDishImages(slots.map(({ dish }) => dish?.dishId));

  // 새로고침은 후보가 떨어지면 409 로 실패한다. 백엔드 메시지를 그대로 보여 준다.
  const onError = showApiErrorPopup;
  const isEditing = deleteDish.isPending || rerollDish.isPending;

  const costOf = (mealType: MealType): number | null =>
    price.data?.items.find((item) => item.mealType === mealType)?.cost ?? null;

  return (
    <>
      <DateNavigator
        ref={prevDayRef}
        label={formatDayLabel(dayOfWeek)}
        onPrev={() => onShiftDay(-1)}
        onNext={() => onShiftDay(1)}
      />
      <CostBar
        cost={price.data?.totalCost}
        isLoading={price.isLoading}
        onRefresh={() => void price.refetch()}
        isRefreshing={price.isFetching}
      />

      <div className={s.editScroll} ref={mealsRef}>
        <div className={s.editMeals} aria-busy={isLoading}>
          {slots.map(({ mealType, dish }) => (
            <div key={mealType} className={s.mealRow}>
              <MealCard
                time={dish ? MEAL_LABELS[mealType] : '미정'}
                name={dish?.name ?? '메뉴명'}
                detail={
                  dish
                    ? (formatCookingTime(dish.cookingTimeMinutes) ??
                      formatWon(costOf(mealType)))
                    : formatWon(null)
                }
                imageUrl={dish ? dishImages.images[dish.dishId] : null}
                isImageLoading={Boolean(dish) && dishImages.isLoading}
                onOpenRecipe={
                  dish ? () => navigate(`/recipe/${dish.dishId}`) : undefined
                }
              />
              <MealActions
                mealLabel={MEAL_LABELS[mealType]}
                isBusy={isEditing}
                hasDish={Boolean(dish)}
                onDelete={() =>
                  deleteDish.mutate({ dayOfWeek, mealType }, { onError })
                }
                onChange={() =>
                  rerollDish.mutate({ dayOfWeek, mealType }, { onError })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DayMealEditor;
