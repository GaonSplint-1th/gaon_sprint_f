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
import * as s from '../Home/style.css';

/**
 * 식단 수정 — 이미 쓰고 있는 식단에서 한두 끼를 고치러 들어오는 화면.
 *
 * 확정 절차가 없다. 고칠 만큼 고치고 나가면 그만이다.
 * 일주일을 처음부터 훑는 흐름은 식단 작성(MenuPlan)이 맡는다.
 */
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
  const issueReceipt = useIssueShoppingList();
  const prevDayRef = useRef<HTMLButtonElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const guide = useFirstVisitGuide('menu-edit');

  const hasNoMenu = getApiErrorStatus(currentMenu.error) === 404;

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
   *
   * 실패하면 이 화면에 남는다. 끼니 수정은 누를 때마다 이미 저장돼 있으니 잃는 건
   * 없지만, 조용히 나가 버리면 장보기 목록이 옛 내용인 걸 아무도 모른다.
   */
  const finish = () => {
    const weeklyMenuId = currentMenu.data?.weeklyMenuId;
    if (weeklyMenuId == null) {
      goBack();
      return;
    }
    issueReceipt.mutate(weeklyMenuId, {
      onSuccess: goBack,
      onError: showApiErrorPopup,
    });
  };

  return (
    <Screen>
      <PageHeader title="식단 수정" onBack={goBack} onInfo={guide.reopen} />

      <h2 className={s.planTitle}>{currentMenu.data?.name ?? '식단'}</h2>
      <p className={s.planDescription}>스크롤하여 메뉴를 변경할 수 있습니다.</p>

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
