import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Screen } from '@/components/layout';
import {
  BottomButton,
  CostBar,
  DateNavigator,
  MealCard,
  PageHeader,
} from '@/components/common';
import { useCurrentMenu, useDeleteDish, useRerollDish } from '@/services/menu';
import { useDishImages } from '@/services/dish';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { useIssueShoppingList } from '@/services/shopping';
import { getApiErrorStatus, showApiErrorPopup } from '@/api';
import { ROUTES } from '@/constants';
import { useConfirmedDays } from './useConfirmedDays';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import { useGoBack } from '@/hooks/useGoBack';
import MealActions from './MealActions';
import {
  MEAL_LABELS,
  formatCookingTime,
  formatDayLabel,
  formatWon,
  getTodayDayOfWeek,
  parseDayOfWeek,
  shiftDayOfWeek,
  toMealSlots,
} from '@/utils/menu';
import type { DayOfWeek, MealType } from '@/types';
import * as s from '../Home/style.css';

/** 일주일치를 다 확정하면 끝난다. */
const TOTAL_DAYS = 7;

const MenuEditPage = () => {
  const navigate = useNavigate();
  const goBack = useGoBack();
  /*
   * 어느 요일을 보다 들어왔는지는 주소가 들고 있다 (`/edit?day=3`).
   * 홈에서 화요일을 보다 수정을 누르면 화요일이 첫 화면이어야 한다.
   * 값이 없거나 이상하면 오늘로 연다.
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(
    () => parseDayOfWeek(searchParams.get('day')) ?? getTodayDayOfWeek(),
  );

  /*
   * 요일이 바뀌면 주소를 맞춰 둔다. 새로고침해도 같은 요일로 돌아온다.
   * replace 로 둔다 — 날짜를 넘길 때마다 뒤로가기가 한 칸씩 쌓이면 안 된다.
   */
  useEffect(() => {
    setSearchParams({ day: String(dayOfWeek) }, { replace: true });
  }, [dayOfWeek, setSearchParams]);

  /*
   * 이동은 반드시 직전 값에서 센다. 화살표를 연달아 누르면 두 번 다 같은
   * 렌더의 dayOfWeek 를 보게 되어 하루밖에 안 넘어간다.
   */
  const shiftDay = (delta: number) =>
    setDayOfWeek((current) => shiftDayOfWeek(current, delta));

  const currentMenu = useCurrentMenu();
  const price = useWeeklyMenuPrice(currentMenu.data?.weeklyMenuId, dayOfWeek);
  const deleteDish = useDeleteDish();
  const rerollDish = useRerollDish();
  const confirmed = useConfirmedDays(currentMenu.data?.weeklyMenuId);
  const issueReceipt = useIssueShoppingList();
  const prevDayRef = useRef<HTMLButtonElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const guide = useFirstVisitGuide('menu-edit');

  const hasNoMenu = getApiErrorStatus(currentMenu.error) === 404;

  const day = currentMenu.data?.days.find((it) => it.dayOfWeek === dayOfWeek);
  const slots = useMemo(() => toMealSlots(day?.dishes), [day?.dishes]);

  // 식단 응답에는 요리 이름만 있어 대표 이미지는 요리 상세에서 따로 받아 온다.
  const dishImages = useDishImages(slots.map(({ dish }) => dish?.dishId));

  // 새로고침은 후보가 떨어지면 409 로 실패한다. 백엔드 메시지를 그대로 보여 준다.
  const onError = showApiErrorPopup;
  const isEditing = deleteDish.isPending || rerollDish.isPending;

  const costOf = (mealType: MealType): number | null =>
    price.data?.items.find((item) => item.mealType === mealType)?.cost ?? null;

  if (hasNoMenu) {
    return (
      <Screen>
        <PageHeader title="식단 수정" onBack={goBack} />
        <p className={s.planDescription}>
          현재 식단이 없습니다. 먼저 식단을 추천받아 선택해 주세요.
        </p>
      </Screen>
    );
  }

  const isDayConfirmed = confirmed.has(dayOfWeek);
  const allDone = confirmed.count >= TOTAL_DAYS;

  /**
   * 7일을 다 확정하면 그 자리에서 영수증을 뽑고 장보기 화면으로 넘긴다.
   * 발행에 실패해도 확정 자체는 이미 끝났으므로 화면은 넘긴다 —
   * 장보기 화면이 빈 상태에서 다시 뽑을 수 있다.
   */
  const finish = () => {
    const weeklyMenuId = currentMenu.data?.weeklyMenuId;
    if (weeklyMenuId == null) {
      navigate(ROUTES.SHOPPING);
      return;
    }
    issueReceipt.mutate(weeklyMenuId, {
      onSettled: () => navigate(ROUTES.SHOPPING),
    });
  };

  const confirmDay = () => {
    confirmed.add(dayOfWeek);
    if (confirmed.count + 1 >= TOTAL_DAYS) finish();
    else shiftDay(1);
  };

  return (
    <Screen>
      <PageHeader title="식단 수정" onBack={goBack} onInfo={guide.reopen} />

      <h2 className={s.planTitle}>{currentMenu.data?.name ?? '식단'}</h2>
      <p className={s.planDescription}>스크롤하여 메뉴를 변경할 수 있습니다.</p>

      <DateNavigator
        ref={prevDayRef}
        label={formatDayLabel(dayOfWeek)}
        onPrev={() => shiftDay(-1)}
        onNext={() => shiftDay(1)}
      />
      <CostBar
        cost={price.data?.totalCost}
        isLoading={price.isLoading}
        onRefresh={() => void price.refetch()}
        isRefreshing={price.isFetching}
      />

      <div className={s.editScroll} ref={mealsRef}>
        <div className={s.editMeals} aria-busy={currentMenu.isLoading}>
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
                disabled={!dish || isEditing}
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

      <BottomButton
        ref={confirmRef}
        disabled={(isDayConfirmed && !allDone) || issueReceipt.isPending}
        onClick={allDone ? finish : confirmDay}
      >
        {issueReceipt.isPending
          ? '장보기 목록 만드는 중…'
          : allDone
            ? '장보기 목록 보기'
            : `확정하기(${confirmed.count}/${TOTAL_DAYS})`}
      </BottomButton>

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
              body: '스크롤하여 식사별 메뉴를 확인하고, 변경을 눌러 다른 메뉴로 바꾸거나 삭제할 수 있습니다.',
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
    </Screen>
  );
};

export default MenuEditPage;
