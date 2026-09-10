import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import OnboardingGuide from '@/components/common/OnboardingGuide';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import { useDayOfWeekParam } from '@/hooks/useDayOfWeekParam';
import MealActions from './MealActions';
import {
  MEAL_LABELS,
  formatCookingTime,
  formatDayLabel,
  formatWon,
  toMealSlots,
} from '@/utils/menu';
import type { MealType } from '@/types';
import * as s from '../Home/style.css';

const MenuEditPage = () => {
  const navigate = useNavigate();
  const { dayOfWeek, shiftDay } = useDayOfWeekParam();

  /*
   * 뒤로가기는 기록 한 칸 뒤가 아니라 '보던 요일의 홈'으로 간다.
   * 수요일을 고치다 나오면 홈도 수요일이어야 한다. 기록을 되감으면 들어올 때의
   * 요일로 돌아가 버려서, 목적지를 직접 짚는다.
   * replace 라서 이 화면은 기록에 남지 않는다 — 나갔다 다시 뒤로가면 홈 이전으로 간다.
   */
  const goBack = () =>
    navigate(`${ROUTES.HOME}?day=${dayOfWeek}`, { replace: true });

  const currentMenu = useCurrentMenu();
  const price = useWeeklyMenuPrice(currentMenu.data?.weeklyMenuId, dayOfWeek);
  const deleteDish = useDeleteDish();
  const rerollDish = useRerollDish();
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

  /**
   * 수정을 끝낸다. 나가기 전에 영수증을 다시 뽑아 바뀐 메뉴의 재료를 반영한다.
   * 발행에 실패해도 수정 자체는 이미 저장돼 있으므로 화면은 넘긴다 —
   * 장보기 화면에서 다시 뽑을 수 있다.
   */
  const finish = () => {
    const weeklyMenuId = currentMenu.data?.weeklyMenuId;
    if (weeklyMenuId == null) {
      goBack();
      return;
    }
    issueReceipt.mutate(weeklyMenuId, { onSettled: goBack });
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
        disabled={issueReceipt.isPending}
        onClick={finish}
      >
        {issueReceipt.isPending ? '장보기 목록 반영 중…' : '수정 완료'}
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
              title: '수정 끝내기',
              body: '수정을 마치면 바뀐 메뉴에 맞춰 장보기 목록도 다시 만들어 둡니다.',
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
