import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, InfoIcon, NoteOutline } from '@/components/icons';
import { useCurrentMenu, useDeleteDish } from '@/services/menu';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { getApiErrorMessage, getApiErrorStatus } from '@/api';
import { ROUTES } from '@/constants';
import { useConfirmedDays } from './useConfirmedDays';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import SwipeToDelete from './SwipeToDelete';
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

/** 일주일치를 다 확정하면 끝난다. */
const TOTAL_DAYS = 7;

interface MealCardProps {
  mealType: MealType;
  dish: MenuDish | null;
  cost: number | null;
  onOpenRecipe: (dishId: number) => void;
}

const MealCard = ({ mealType, dish, cost, onOpenRecipe }: MealCardProps) => (
  <article className={s.mealCard}>
    <div className={s.mealInfo}>
      <h3 className={s.mealTime}>{dish ? MEAL_LABELS[mealType] : '미정'}</h3>
      <p className={s.mealName}>{dish?.name ?? '메뉴명'}</p>
      <p className={s.mealDetail}>
        {dish
          ? (formatCookingTime(dish.cookingTimeMinutes) ?? formatWon(cost))
          : formatWon(null)}
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
      <span className={s.recipeIcon}>
        <NoteOutline size={34} color="currentColor" />
      </span>
    </div>
  </article>
);

const MenuEditPage = () => {
  const navigate = useNavigate();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(getTodayDayOfWeek());

  const currentMenu = useCurrentMenu();
  const price = useWeeklyMenuPrice(currentMenu.data?.weeklyMenuId, dayOfWeek);
  const deleteDish = useDeleteDish();
  const confirmed = useConfirmedDays(currentMenu.data?.weeklyMenuId);
  const prevDayRef = useRef<HTMLButtonElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  // 처음 들어온 사용자에게 한 번 자동으로 안내를 띄운다.
  const guide = useFirstVisitGuide('menu-edit');

  const hasNoMenu = getApiErrorStatus(currentMenu.error) === 404;

  const day = currentMenu.data?.days.find((it) => it.dayOfWeek === dayOfWeek);
  const slots = useMemo(() => toMealSlots(day?.dishes), [day?.dishes]);

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
            onClick={() => navigate(ROUTES.HOME)}
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className={s.title}>식단 수정</h1>
        </header>
        <p className={s.planDescription}>
          현재 식단이 없습니다. 먼저 식단을 추천받아 선택해 주세요.
        </p>
      </div>
    );
  }

  const isDayConfirmed = confirmed.has(dayOfWeek);
  const allDone = confirmed.count >= TOTAL_DAYS;

  /** 이 날짜를 확정하고 다음 날로 넘어간다. 다 채우면 홈으로. */
  const confirmDay = () => {
    confirmed.add(dayOfWeek);
    if (confirmed.count + 1 >= TOTAL_DAYS) navigate(ROUTES.HOME);
    else setDayOfWeek((value) => shiftDayOfWeek(value, 1));
  };

  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate(ROUTES.HOME)}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={s.title}>식단 수정</h1>
        <button
          type="button"
          className={s.infoIcon}
          aria-label="식단 수정 안내 보기"
          onClick={guide.reopen}
        >
          <InfoIcon />
        </button>
      </header>

      <h2 className={s.planTitle}>{currentMenu.data?.name ?? '식단'}</h2>
      <p className={s.planDescription}>
        스크롤하여 메뉴를 확인하고, 옆으로 밀어 삭제할 수 있습니다.
      </p>

      <div className={s.dateBar}>
        <button
          ref={prevDayRef}
          type="button"
          className={s.dateArrow}
          aria-label="이전 날짜"
          onClick={() => setDayOfWeek((value) => shiftDayOfWeek(value, -1))}
        >
          <ArrowLeftIcon />
        </button>
        <strong>{formatDayLabel(dayOfWeek)}</strong>
        <button
          type="button"
          className={`${s.dateArrow} ${s.dateArrowNext}`}
          aria-label="다음 날짜"
          onClick={() => setDayOfWeek((value) => shiftDayOfWeek(value, 1))}
        >
          <ArrowLeftIcon />
        </button>
      </div>

      <div className={s.costBar}>
        {price.isLoading ? '계산 중…' : formatWon(price.data?.totalCost)}
      </div>

      <div className={s.editScroll} ref={mealsRef}>
        <div className={s.swipeMeals} aria-busy={currentMenu.isLoading}>
          {slots.map(({ mealType, dish }) => (
            <SwipeToDelete
              key={mealType}
              disabled={!dish || deleteDish.isPending}
              deleteLabel={`${MEAL_LABELS[mealType]} 메뉴 삭제`}
              onDelete={() =>
                deleteDish.mutate({ dayOfWeek, mealType }, { onError })
              }
            >
              <MealCard
                mealType={mealType}
                dish={dish}
                cost={costOf(mealType)}
                onOpenRecipe={(dishId) => navigate(`/recipe/${dishId}`)}
              />
            </SwipeToDelete>
          ))}
        </div>
      </div>

      <button
        ref={confirmRef}
        type="button"
        className={`${s.bottomButton} ${isDayConfirmed && !allDone ? s.disabledButton : ''}`}
        disabled={isDayConfirmed && !allDone}
        onClick={allDone ? () => navigate(ROUTES.HOME) : confirmDay}
      >
        {allDone ? '완료' : `확정하기(${confirmed.count}/${TOTAL_DAYS})`}
      </button>

      {guide.open && (
        <OnboardingGuide
          label="식단 수정 안내"
          onClose={guide.close}
          steps={[
            {
              target: prevDayRef,
              title: '날짜별 식단 보기',
              body: '아이콘을 선택하여 날짜를 이동할 수 있습니다.',
            },
            {
              target: mealsRef,
              title: '식단 수정하기',
              body: '스크롤하여 식사별 메뉴를 확인하고, 옆으로 스와이프하여 선택 메뉴를 삭제할 수 있습니다.',
              placement: 'inside',
            },
            {
              target: confirmRef,
              title: '수정된 식단 확정하기',
              body: '하루씩 확정하면 7일까지 채울 수 있습니다.',
              placement: 'above',
              filled: true,
            },
          ]}
        />
      )}
    </div>
  );
};

export default MenuEditPage;
