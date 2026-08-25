import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, InfoIcon, MenuStarIcon } from '@/components/icons';
import { useCreateCurrentMenu } from '@/services/menu';
import {
  useWeeklyMenuDetail,
  useWeeklyMenuTemplates,
} from '@/services/weeklyMenu';
import { getApiErrorMessage } from '@/api';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import {
  MEAL_LABELS,
  formatDayLabel,
  formatWon,
  toMealSlots,
} from '@/utils/menu';
import type { WeeklyMenuSummary } from '@/types';
import * as s from '../Home/style.css';

const Skeleton = () => (
  <div
    className={s.screen}
    aria-busy="true"
    aria-label="식단 추천을 불러오는 중"
  >
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
);

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
  // 이름·요약 문구·예상 식비가 모두 목록 응답에 들어 있어 카드가 따로 호출하지 않는다.
  // 상세(21끼 구성)는 미리보기를 열 때만 받아 온다.
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
        {[0, 1, 2].map((index) => (
          <div className={s.placeholder} key={index}>
            이미지
          </div>
        ))}
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

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', keydown);
    };
  }, [onClose]);

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
                    <div className={s.modalPlaceholder} />
                    {dish?.name ?? `${MEAL_LABELS[mealType]} 미정`}
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
        onSuccess: () => navigate('/edit'),
        onError: (error) => window.alert(getApiErrorMessage(error)),
      },
    );
  };

  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate('/')}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={s.title}>식단 추천</h1>
        <button
          type="button"
          className={s.infoIcon}
          aria-label="식단 추천 안내 보기"
          onClick={guide.reopen}
        >
          <InfoIcon />
        </button>
      </header>

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

      <button
        ref={ctaRef}
        type="button"
        className={`${s.bottomButton} ${selectedId == null ? s.disabledButton : ''}`}
        disabled={selectedId == null || createCurrentMenu.isPending}
        onClick={applySelected}
      >
        {selectedId == null ? '메뉴 선택하기' : '메뉴 수정하기'}
      </button>

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
    </div>
  );
};

export default DietRecommendPage;
