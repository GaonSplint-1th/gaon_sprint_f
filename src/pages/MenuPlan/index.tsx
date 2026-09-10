import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '@/components/layout';
import { BottomButton, DayMealEditor, PageHeader } from '@/components/common';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import { useCurrentMenu } from '@/services/menu';
import { useIssueShoppingList } from '@/services/shopping';
import { getApiErrorStatus, showApiErrorPopup } from '@/api';
import { ROUTES } from '@/constants';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import { useDayOfWeekParam } from '@/hooks/useDayOfWeekParam';
import { useGoBack } from '@/hooks/useGoBack';
import { useConfirmedDays } from './useConfirmedDays';
import * as s from '../Home/style.css';

/** 일주일치를 다 확정하면 끝난다. */
const TOTAL_DAYS = 7;

/**
 * 식단 작성 — 추천받은 식단을 처음 자기 것으로 만드는 화면.
 *
 * 하루씩 확인하고 확정하며 7일을 채운다. 다 채우면 그 자리에서 장보기 목록을
 * 뽑아 넘겨 준다. 이미 쓰고 있는 식단에서 한두 끼만 고치는 건 식단 수정(MenuEdit)이다.
 */
const MenuPlanPage = () => {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { dayOfWeek, shiftDay } = useDayOfWeekParam();

  const currentMenu = useCurrentMenu();
  const confirmed = useConfirmedDays(currentMenu.data?.weeklyMenuId);
  const issueReceipt = useIssueShoppingList();
  const prevDayRef = useRef<HTMLButtonElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const guide = useFirstVisitGuide('menu-plan');

  const hasNoMenu = getApiErrorStatus(currentMenu.error) === 404;

  if (hasNoMenu) {
    return (
      <Screen>
        <PageHeader title="식단 작성" onBack={goBack} />
        <p className={s.planDescription}>
          현재 식단이 없습니다. 먼저 식단을 추천받아 선택해 주세요.
        </p>
      </Screen>
    );
  }

  const isDayConfirmed = confirmed.has(dayOfWeek);
  const allDone = confirmed.count >= TOTAL_DAYS;

  /**
   * 일주일을 다 확정했다. 장보기 목록을 뽑아 그 화면으로 넘긴다.
   *
   * 실패하면 이 화면에 남는다. 확정 자체는 이미 끝나 있으니 잃는 건 없지만,
   * 조용히 넘어가면 목록이 빈 이유를 아무도 모른다.
   */
  const finish = () => {
    const weeklyMenuId = currentMenu.data?.weeklyMenuId;
    if (weeklyMenuId == null) {
      navigate(ROUTES.SHOPPING);
      return;
    }
    issueReceipt.mutate(weeklyMenuId, {
      onSuccess: () => navigate(ROUTES.SHOPPING),
      onError: showApiErrorPopup,
    });
  };

  const confirmDay = () => {
    confirmed.add(dayOfWeek);
    if (confirmed.count + 1 >= TOTAL_DAYS) finish();
    else shiftDay(1);
  };

  return (
    <Screen>
      <PageHeader title="식단 작성" onBack={goBack} onInfo={guide.reopen} />

      <h2 className={s.planTitle}>{currentMenu.data?.name ?? '식단'}</h2>
      <p className={s.planDescription}>
        하루씩 확인하고 확정하면 일주일 식단이 완성됩니다.
      </p>

      <DayMealEditor
        weeklyMenuId={currentMenu.data?.weeklyMenuId}
        days={currentMenu.data?.days}
        isLoading={currentMenu.isLoading}
        dayOfWeek={dayOfWeek}
        onShiftDay={shiftDay}
        prevDayRef={prevDayRef}
        mealsRef={mealsRef}
      />

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
          label="식단 작성 안내"
          onClose={guide.close}
          steps={[
            {
              target: prevDayRef,
              title: '날짜별 식단 보기',
              body: '아이콘을 선택하여 날짜를 이동할 수 있습니다.',
            },
            {
              target: mealsRef,
              title: '메뉴 손보기',
              body: '스크롤하여 식사별 메뉴를 확인하고, 변경을 눌러 다른 메뉴로 바꾸거나 삭제할 수 있습니다.',
              placement: 'inside',
            },
            {
              target: confirmRef,
              title: '하루씩 확정하기',
              body: '하루씩 확정하면 7일까지 채울 수 있습니다. 다 채우면 장보기 목록을 만들어 드려요.',
              placement: 'above',
              filled: true,
            },
          ]}
        />
      )}
    </Screen>
  );
};

export default MenuPlanPage;
