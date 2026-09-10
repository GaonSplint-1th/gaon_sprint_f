import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuStarIcon } from '@/components/icons';
import { Screen } from '@/components/layout';
import { BottomButton, DishImage, PageHeader } from '@/components/common';
import { useCreateCurrentMenu } from '@/services/menu';
import { useDishImages } from '@/services/dish';
import {
  useWeeklyMenuDetail,
  useWeeklyMenuTemplates,
} from '@/services/weeklyMenu';
import { showApiErrorPopup } from '@/api';
import { ROUTES } from '@/constants';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import { useGoBack } from '@/hooks/useGoBack';
import { useDismissableLayer } from '@/hooks/useDismissableLayer';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import {
  MEAL_LABELS,
  formatDayLabel,
  formatWon,
  toMealSlots,
} from '@/utils/menu';
import type { WeeklyMenuDetail, WeeklyMenuSummary } from '@/types';
import * as s from '../Home/style.css';

/** 카드 위에 미리 보여 주는 요리 이미지 개수. */
const CARD_IMAGE_COUNT = 3;

const Skeleton = () => (
  <Screen>
    <div aria-busy="true" aria-label="식단 추천을 불러오는 중">
      <div className={s.skeletonTitle}>
        <span className={s.skeletonCircle} />
        <span className={s.skeletonTitleLine} />
      </div>
      {[1, 2, 3].map((item) => (
        <div className={s.skeletonCard} key={item}>
          <span className={s.skeletonImage} />
          <span className={s.skeletonLine} />
          <span className={s.skeletonSideImage} />
        </div>
      ))}
    </div>
  </Screen>
);

/** 상세의 7일 × 3끼를 요일·끼니 순서 그대로 편다. */
const flattenDishes = (detail: WeeklyMenuDetail | undefined) =>
  detail?.days.flatMap((day) => day.dishes) ?? [];

interface TemplateCardProps {
  /** 안내에서 짚어 줄 첫 카드에만 넘어온다. */
  cardRef?: React.RefObject<HTMLElement | null>;
  template: WeeklyMenuSummary;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

const TemplateCard = ({
  cardRef,
  template,
  selected,
  onSelect,
  onPreview,
}: TemplateCardProps) => {
  // 이름·요약 문구·예상 식비는 목록 응답에 들어 있다.
  // 다만 목록에는 요리 이미지가 없어, 카드 위 미리보기 3장을 위해 상세를 받아 온다.
  // 상세는 미리보기 모달과 같은 캐시를 쓰므로 모달을 열 때 다시 부르지 않는다.
  const detail = useWeeklyMenuDetail(template.weeklyMenuId);
  const previewDishes = flattenDishes(detail.data).slice(0, CARD_IMAGE_COUNT);
  const dishImages = useDishImages(previewDishes.map((dish) => dish.dishId));

  return (
    <article
      ref={cardRef as React.Ref<HTMLElement>}
      className={`${s.recommendCard} ${selected ? s.selectedCard : ''}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
    >
      <div className={s.recommendTop}>
        <strong>{template.name}</strong>
        <span>예상 {formatWon(template.estimatedCost)}</span>
      </div>
      <div className={s.imageRow}>
        {/* 상세가 아직이거나 끼니가 비어도 칸 수는 유지해 카드 높이가 흔들리지 않게 한다. */}
        {Array.from({ length: CARD_IMAGE_COUNT }, (_, index) => {
          const dish = previewDishes[index];
          return (
            <DishImage
              key={dish?.dishId ?? `empty-${index}`}
              className={s.cardImage}
              src={dish ? dishImages.images[dish.dishId] : null}
              alt={dish?.name ?? ''}
              iconSize={20}
              isLoading={detail.isLoading || dishImages.isLoading}
            />
          );
        })}
      </div>
      <p className={s.ingredients}>
        <span className={s.ingredientIcon} aria-hidden="true">
          <MenuStarIcon width={18} height={18} />
        </span>
        {template.highlight ?? '구성 정보 없음'}
      </p>
      <button
        type="button"
        className={s.previewButton}
        onClick={(event) => {
          event.stopPropagation();
          onPreview();
        }}
      >
        미리보기 ›
      </button>
    </article>
  );
};

const PreviewModal = ({
  weeklyMenuId,
  onClose,
}: {
  weeklyMenuId: number;
  onClose: () => void;
}) => {
  const detail = useWeeklyMenuDetail(weeklyMenuId);
  const modalRef = useRef<HTMLDivElement>(null);
  // 21끼를 한 번에 받아 두면 요일을 훑어 내려도 이미지가 새로 뜨지 않는다.
  const dishImages = useDishImages(
    flattenDishes(detail.data).map((dish) => dish.dishId),
  );

  useDismissableLayer(onClose, { containerRef: modalRef, trapFocus: true });

  return (
    <div className={s.modalBackdrop} onClick={onClose}>
      <div
        ref={modalRef}
        className={s.previewModal}
        role="dialog"
        aria-modal="true"
        aria-label="식단 미리보기"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={s.modalHeader}>
          <strong>{detail.data?.name ?? '불러오는 중…'}</strong>
        </div>
        <div className={s.modalBody} aria-busy={detail.isLoading}>
          {detail.data?.days.map((day) => (
            <div key={day.dayOfWeek}>
              <p>{formatDayLabel(day.dayOfWeek)}</p>
              <div className={s.dayMeals}>
                {toMealSlots(day.dishes).map(({ mealType, dish }) => (
                  <div className={s.dayMeal} key={mealType}>
                    <DishImage
                      className={s.dayMealImage}
                      src={dish ? dishImages.images[dish.dishId] : null}
                      alt={dish?.name ?? ''}
                      iconSize={18}
                      isLoading={Boolean(dish) && dishImages.isLoading}
                    />
                    <span
                      className={s.dayMealName}
                      title={dish?.name ?? undefined}
                    >
                      {dish?.name ?? `${MEAL_LABELS[mealType]} 미정`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={s.modalFooter}>
          <button
            type="button"
            className={s.modalCloseButton}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

const DietRecommendPage = () => {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const templates = useWeeklyMenuTemplates();
  const createCurrentMenu = useCreateCurrentMenu();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [previewId, setPreviewId] = useState<number | null>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  // 처음 들어온 사용자에게 한 번 자동으로 안내를 띄운다.
  const guide = useFirstVisitGuide('recommend');

  if (templates.isLoading) return <Skeleton />;

  const items = templates.data?.items ?? [];

  /** 선택한 템플릿을 현재 식단으로 등록한 뒤 수정 화면으로 넘어간다. */
  const applySelected = () => {
    if (selectedId == null) return;
    createCurrentMenu.mutate(
      { weeklyMenuId: selectedId },
      {
        onSuccess: () => navigate(ROUTES.MENU_PLAN),
        onError: showApiErrorPopup,
      },
    );
  };

  return (
    <Screen>
      <PageHeader title="식단 추천" onBack={goBack} onInfo={guide.reopen} />

      <div className={s.recommendList}>
        {items.length === 0 ? (
          <p className={s.planDescription}>추천할 수 있는 식단이 없습니다.</p>
        ) : (
          items.map((template, index) => (
            <TemplateCard
              key={template.weeklyMenuId}
              cardRef={index === 0 ? firstCardRef : undefined}
              template={template}
              selected={selectedId === template.weeklyMenuId}
              onSelect={() => setSelectedId(template.weeklyMenuId)}
              onPreview={() => setPreviewId(template.weeklyMenuId)}
            />
          ))
        )}
      </div>

      <BottomButton
        ref={ctaRef}
        disabled={selectedId == null || createCurrentMenu.isPending}
        onClick={applySelected}
      >
        {selectedId == null ? '메뉴 선택하기' : '메뉴 수정하기'}
      </BottomButton>

      {guide.open && (
        <OnboardingGuide
          label="식단 추천 안내"
          onClose={guide.close}
          steps={[
            {
              target: firstCardRef,
              title: '추천식단',
              body: '추천된 식단을 골라 적용해보세요.',
              filled: true,
            },
            {
              target: ctaRef,
              title: '메뉴 수정하기',
              body: '메뉴 수정하기를 눌러 메뉴를 상세히 보고 수정해보세요.',
              placement: 'above',
              filled: true,
            },
          ]}
        />
      )}

      {previewId != null && (
        <PreviewModal
          weeklyMenuId={previewId}
          onClose={() => setPreviewId(null)}
        />
      )}
    </Screen>
  );
};

export default DietRecommendPage;
