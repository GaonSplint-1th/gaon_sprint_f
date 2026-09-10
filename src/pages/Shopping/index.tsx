import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import { getApiErrorStatus, showApiErrorPopup } from '@/api';
import { ROUTES } from '@/constants';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import { useGoBack } from '@/hooks/useGoBack';
import { CATEGORIES } from '@/services/ingredient';
import { useCurrentMenu } from '@/services/menu';
import {
  useChangeShoppingListItemStatus,
  useIssueShoppingList,
  useShoppingList,
} from '@/services/shopping';
import { useWeeklyMenuPrice } from '@/services/weeklyMenu';
import { toCategoryId } from '@/utils/ingredient';
import { formatWon } from '@/utils/menu';
import { foldIngredients, lineTotal, usageRatio } from '@/utils/shopping';
import type { ShoppingListItem } from '@/types';
import ReceiptRow from './ReceiptRow';
import * as s from './style.css';

/** 이번 주 월~일. 영수증 머리말에 찍는다. */
const weekRangeLabel = (): string => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const dm = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
  return `${dm(monday)} – ${dm(sunday)}`;
};

const ShoppingPage = () => {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const guide = useFirstVisitGuide('shopping');

  const currentMenu = useCurrentMenu();
  const shoppingList = useShoppingList();
  const changeStatus = useChangeShoppingListItemStatus();
  const issue = useIssueShoppingList();

  // 영수증에는 없는 정보(카테고리·쓰임)를 가격 계산에서 빌려 온다.
  // 목록 자체는 저장된 영수증이 기준이고, 이건 덧칠이다.
  const price = useWeeklyMenuPrice(currentMenu.data?.weeklyMenuId);

  const firstRowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const usageByIngredient = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const usage of foldIngredients(price.data)) {
      map.set(usage.ingredientId, usage.dishNames);
    }
    return map;
  }, [price.data]);

  const categoryByIngredient = useMemo(() => {
    const map = new Map<number, string>();
    for (const usage of foldIngredients(price.data)) {
      map.set(usage.ingredientId, toCategoryId(usage.category));
    }
    return map;
  }, [price.data]);

  const items = useMemo(
    () => shoppingList.data?.items ?? [],
    [shoppingList.data?.items],
  );

  /** 마트 동선 순서(CATEGORIES)대로 묶는다. 카테고리를 모르면 기타로 보낸다. */
  const grouped = useMemo(() => {
    const buckets = new Map<string, ShoppingListItem[]>();
    for (const item of items) {
      const categoryId = categoryByIngredient.get(item.ingredientId) ?? 'etc';
      buckets.set(categoryId, [...(buckets.get(categoryId) ?? []), item]);
    }
    return CATEGORIES.map((category) => ({
      ...category,
      items: buckets.get(category.id) ?? [],
    })).filter((category) => category.items.length > 0);
  }, [items, categoryByIngredient]);

  const buying = items.filter((item) => item.status !== 'SKIPPED');
  const skipped = items.filter((item) => item.status === 'SKIPPED');
  const checked = items.filter((item) => item.status === 'CHECKED');

  /** 한 줄의 실제 금액 — 단위 가격 × 사야 하는 개수. */
  const priceOf = (item: ShoppingListItem) =>
    lineTotal(item.unitPrice, item.quantityGrams, item.unitGrams) ?? 0;
  const subtotal = items.reduce((sum, item) => sum + priceOf(item), 0);
  const skippedSum = skipped.reduce((sum, item) => sum + priceOf(item), 0);
  const total = subtotal - skippedSum;

  /** 산 것 중 이번 주에 실제로 쓰는 값. 남는 양이 얼마인지 말해 주려고 같이 낸다. */
  const usedValue = buying.reduce((sum, item) => {
    const ratio = usageRatio(item.quantityGrams, item.unitGrams) ?? 1;
    return sum + Math.round(priceOf(item) * ratio);
  }, 0);

  const allChecked = buying.length > 0 && checked.length === buying.length;
  const isBusy = changeStatus.isPending || issue.isPending;

  const hasNoMenu =
    getApiErrorStatus(shoppingList.error) === 404 ||
    getApiErrorStatus(currentMenu.error) === 404;

  /* ── 빈 상태 ── */
  if (hasNoMenu || (shoppingList.isSuccess && items.length === 0)) {
    const canIssue = !hasNoMenu && currentMenu.data?.weeklyMenuId != null;
    return (
      <div className={s.screen}>
        <PageHeader title="장보기 목록" onBack={goBack} />
        <div className={s.empty}>
          <p className={s.emptyTitle}>아직 뽑은 영수증이 없어요</p>
          <p className={s.emptyBody}>
            {canIssue
              ? '이번 주 식단에 들어가는 재료를 한 장으로 모아 드릴게요.'
              : '먼저 식단을 정하면 필요한 재료를 모아 영수증으로 보여 드려요.'}
          </p>
        </div>
        <div className={s.ctaGradient} />
        <div className={s.ctaDock}>
          <button
            type="button"
            className={s.cta}
            disabled={issue.isPending}
            onClick={() =>
              canIssue
                ? issue.mutate(currentMenu.data!.weeklyMenuId, {
                    onError: showApiErrorPopup,
                  })
                : navigate(ROUTES.HOME)
            }
          >
            {canIssue
              ? issue.isPending
                ? '영수증 뽑는 중…'
                : '영수증 뽑기'
              : '식단 정하러 가기'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.screen}>
      <PageHeader title="장보기 목록" onBack={goBack} onInfo={guide.reopen} />

      <section className={s.summary} aria-label="이번 주 장보기 요약">
        <div className={s.summaryTop}>
          <span className={s.summaryRange}>{weekRangeLabel()}</span>
          <span className={s.summaryPlan}>
            {currentMenu.data?.name ?? '이번 주 식단'}
          </span>
        </div>
        <div className={s.summaryTotal}>
          <span className={s.summaryLabel}>살 금액</span>
          <strong className={s.summaryAmount}>{formatWon(total)}</strong>
        </div>
        <div className={s.progress}>
          <div className={s.progressRow}>
            <span>장바구니에 담은 재료</span>
            <span className={s.progressCount}>
              {checked.length} / {buying.length}
            </span>
          </div>
          <div className={s.track}>
            <div
              className={s.fill}
              style={{
                width: buying.length
                  ? `${(checked.length / buying.length) * 100}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      </section>

      <p className={s.lead}>
        이번 주 요리에 들어가는 재료 전부예요.{' '}
        <b className={s.leadStrong}>살 것은 체크</b>,{' '}
        <b className={s.leadStrong}>집에 이미 있는 것은 안 살래요</b>를 누르면
        합계에서 빠집니다.
      </p>

      <div className={s.paperWrap}>
        <div className={s.paper}>
          <div className={s.receiptHead}>
            <div className={s.receiptTitle}>MEAL PICK</div>
            <div className={s.receiptMeta}>
              {weekRangeLabel()} · 7일 21끼
              <br />
              {currentMenu.data?.name ?? '이번 주 식단'}
            </div>
          </div>

          <div className={s.rule} />

          <div ref={firstRowRef}>
            {grouped.map((category) => (
              <div key={category.id}>
                <div className={s.category}>
                  <span className={s.categoryName}>{category.label}</span>
                  <span className={s.categoryLine} />
                  <span className={s.categoryCount}>
                    {category.items.length}건
                  </span>
                </div>
                {category.items.map((item) => (
                  <ReceiptRow
                    key={item.shoppingListItemId}
                    item={item}
                    dishNames={usageByIngredient.get(item.ingredientId) ?? []}
                    disabled={isBusy}
                    onCheck={(isChecked) =>
                      changeStatus.mutate(
                        {
                          itemId: item.shoppingListItemId,
                          status: isChecked ? 'CHECKED' : 'PENDING',
                        },
                        { onError: showApiErrorPopup },
                      )
                    }
                    onToggleSkip={() =>
                      changeStatus.mutate(
                        {
                          itemId: item.shoppingListItemId,
                          status:
                            item.status === 'SKIPPED' ? 'PENDING' : 'SKIPPED',
                        },
                        { onError: showApiErrorPopup },
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>

          <div className={s.ruleSolid} />

          <div className={s.totals}>
            <div className={s.totalRow}>
              <span>재료 {items.length}종 소계</span>
              <span className={s.totalValue}>{formatWon(subtotal)}</span>
            </div>
            {skipped.length > 0 && (
              <div className={s.totalRow}>
                <span>안 살래요 {skipped.length}종</span>
                <span className={s.totalValueMinus}>
                  -{formatWon(skippedSum)}
                </span>
              </div>
            )}
            <div className={s.grandRow}>
              <span>살 금액</span>
              <span className={s.grandValue}>{formatWon(total)}</span>
            </div>
          </div>

          <p className={s.note}>
            살 재료 중 이번 주 식단이 실제로 쓰는 양은{' '}
            <b className={s.noteStrong}>{formatWon(usedValue)}</b>어치예요.
            나머지{' '}
            <b className={s.noteStrong}>{formatWon(total - usedValue)}</b>
            어치는 남아서 다음 주에 다시 씁니다.
          </p>

          <div className={s.stamp}>
            <span>
              GAON-{currentMenu.data?.weeklyMenuId ?? '000'}-
              {items.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className={s.ctaGradient} />
      <div className={s.ctaDock}>
        {/*
          다 담지 않아도 나갈 수 있다. 장은 한 자리에서 끝나지 않는다 —
          목록만 확인하고 나중에 마트에서 이어 담는 게 보통이다.
          돌아오는 길은 홈의 영수증 카드가 맡는다.
        */}
        <button
          ref={ctaRef}
          type="button"
          className={s.cta}
          disabled={isBusy}
          onClick={() => navigate(ROUTES.HOME)}
        >
          {allChecked ? '장보기 완료' : '나중에 이어서 하기'}
          <span className={s.ctaCount}>
            {checked.length}/{buying.length}
          </span>
        </button>
      </div>

      {guide.open && (
        <OnboardingGuide
          label="장보기 목록 안내"
          onClose={guide.close}
          steps={[
            {
              target: firstRowRef,
              title: '사야 하는 양과 쓰는 양',
              body: '가게에서 파는 단위와 이번 주에 쓰는 양을 나란히 보여 줍니다. 많이 남는 재료는 집에 있는지 먼저 확인해 보세요.',
              placement: 'inside',
            },
            {
              target: ctaRef,
              title: '담을 때마다 체크',
              body: '장바구니에 담은 재료를 체크하고, 집에 있어 안 살 재료는 안 살래요를 누르면 합계에서 빠집니다. 다 담지 않고 나가도 홈에서 다시 이어 담을 수 있어요.',
              placement: 'above',
              filled: true,
            },
          ]}
        />
      )}
    </div>
  );
};

export default ShoppingPage;
