import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Screen } from '@/components/layout';
import {
  Button,
  Modal,
  RecommendCard,
  RecommendCardSkeleton,
} from '@/components/common';
import { getApiErrorMessage } from '@/api';
import { useCreateCurrentMenu } from '@/services/menu';
import {
  useWeeklyMenuDetail,
  useWeeklyMenuPrice,
  useWeeklyMenuTemplates,
} from '@/services/weeklyMenu';
import { DAY_LABELS, MEAL_LABELS, MEAL_TYPES } from '@/utils/menu';
import type { WeeklyMenuSummary } from '@/types';
import * as s from './style.css';

const SKELETON_COUNT = 3;

const formatWon = (value: number) =>
  `예상 ${Math.round(value).toLocaleString()}원`;

interface TemplateCardProps {
  template: WeeklyMenuSummary;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

/**
 * 템플릿 한 장.
 * 가격은 템플릿 목록에 없고 계산 API 를 따로 불러야 해서 카드마다 조회한다.
 */
const TemplateCard = ({
  template,
  selected,
  onSelect,
  onPreview,
}: TemplateCardProps) => {
  const { data: price } = useWeeklyMenuPrice(template.weeklyMenuId);

  return (
    <RecommendCard
      name={template.name}
      price={price ? formatWon(price.totalCost) : '가격 계산 중'}
      menus={template.highlight ?? ''}
      thumbnailUrls={[template.imageUrl ?? undefined]}
      selected={selected}
      onSelect={onSelect}
      onPreview={onPreview}
    />
  );
};

interface PreviewProps {
  template: WeeklyMenuSummary;
  onClose: () => void;
}

/** 미리보기 — 템플릿 상세를 요일별로 보여준다. */
const PreviewModal = ({ template, onClose }: PreviewProps) => {
  const { data: detail, isLoading } = useWeeklyMenuDetail(
    template.weeklyMenuId,
  );

  return (
    <Modal
      title={template.name}
      onClose={onClose}
      footer={
        <Button size="half" onClick={onClose}>
          닫기
        </Button>
      }
    >
      {isLoading && <p className={s.message}>불러오는 중이에요…</p>}

      {detail && (
        <div className={s.dayList}>
          {detail.days.map((day) => {
            const dishByMeal = new Map(
              day.dishes.map((dish) => [dish.mealType, dish]),
            );
            return (
              <section className={s.day} key={day.dayOfWeek}>
                <h3 className={s.dayLabel}>{DAY_LABELS[day.dayOfWeek]}요일</h3>
                <div className={s.dayMeals}>
                  {MEAL_TYPES.map((mealType) => (
                    <div className={s.dayMeal} key={mealType}>
                      <div className={s.dayMealThumbnail} />
                      {dishByMeal.get(mealType)?.name ??
                        `${MEAL_LABELS[mealType]}메뉴`}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Modal>
  );
};

const DietRecommendPage = () => {
  const navigate = useNavigate();

  // 세션 대기 중에는 쿼리가 비활성이라 isLoading 이 false 다. isPending 으로 스켈레톤을 유지한다.
  const { data, isPending, isError, error } = useWeeklyMenuTemplates();
  const createCurrentMenu = useCreateCurrentMenu();

  // 시안 05: 처음에는 아무 카드도 선택돼 있지 않고 하단 버튼도 비활성이다.
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [previewTemplate, setPreviewTemplate] =
    useState<WeeklyMenuSummary | null>(null);

  const templates = data?.items ?? [];

  /** 고른 템플릿을 내 식단으로 등록한 뒤 수정 화면으로 넘어간다. */
  const confirm = async () => {
    if (selectedId == null) return;
    await createCurrentMenu.mutateAsync({ weeklyMenuId: selectedId });
    navigate('/edit');
  };

  return (
    <Screen
      bottomCta={
        <Button
          disabled={
            isPending || selectedId == null || createCurrentMenu.isPending
          }
          onClick={() => void confirm()}
        >
          메뉴 수정하기
        </Button>
      }
    >
      <AppBar
        title="식단 추천"
        onBack={() => navigate('/')}
        onInfo={() => undefined}
      />

      {isPending && !isError && (
        <div
          className={s.cardList}
          aria-busy="true"
          aria-label="식단 추천을 불러오는 중"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <RecommendCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && <p className={s.message}>{getApiErrorMessage(error)}</p>}

      {!isPending && !isError && templates.length === 0 && (
        <p className={s.message}>추천할 수 있는 식단이 아직 없어요.</p>
      )}

      {!isPending && !isError && templates.length > 0 && (
        <div className={s.cardList}>
          {templates.map((template) => (
            <TemplateCard
              key={template.weeklyMenuId}
              template={template}
              selected={selectedId === template.weeklyMenuId}
              onSelect={() => setSelectedId(template.weeklyMenuId)}
              onPreview={() => setPreviewTemplate(template)}
            />
          ))}
        </div>
      )}

      {previewTemplate && (
        <PreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </Screen>
  );
};

export default DietRecommendPage;
