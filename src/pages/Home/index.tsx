import { useMemo } from 'react';
import { getApiErrorStatus } from '@/api';
import { useTodayMenu } from '@/services/menu';
import { formatDateLabel, MEAL_LABELS, MEAL_TYPES } from '@/utils/menu';
import * as s from './style.css';

const todayLabel = formatDateLabel();

const HomePage = () => {
  const { data, isError, error } = useTodayMenu();

  // 끼니 순서(아침→점심→저녁)로 정렬해 안정적으로 보여준다.
  const dishes = useMemo(
    () =>
      [...(data?.dishes ?? [])].sort(
        (a, b) =>
          MEAL_TYPES.indexOf(a.mealType) - MEAL_TYPES.indexOf(b.mealType),
      ),
    [data],
  );

  // "현재 식단 없음"은 404 로 내려온다 — 오류가 아니라 빈 상태로 취급한다.
  const isEmpty =
    (isError && getApiErrorStatus(error) === 404) ||
    (!!data && dishes.length === 0);
  const isLoading = !data && !isError;
  const isFailed = isError && getApiErrorStatus(error) !== 404;

  const renderMeals = () => {
    if (isLoading) {
      return (
        <div className={s.stateBox}>
          <p className={s.stateText}>식단을 불러오는 중이에요…</p>
        </div>
      );
    }
    if (isFailed) {
      return (
        <div className={s.stateBox}>
          <p className={s.stateText}>
            식단을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
        </div>
      );
    }
    if (isEmpty) {
      return (
        <div className={s.stateBox}>
          <p className={s.stateText}>오늘 등록된 식단이 없어요.</p>
        </div>
      );
    }

    return (
      <div className={s.mealList}>
        {dishes.map((meal) => (
          <article className={s.mealCard} key={meal.mealType}>
            <div className={s.mealInfo}>
              <h3 className={s.mealTime}>{MEAL_LABELS[meal.mealType]}</h3>
              <p className={s.mealName}>{meal.name}</p>
              {meal.cookingTimeMinutes != null && (
                <p className={s.mealDetail}>조리 {meal.cookingTimeMinutes}분</p>
              )}
              <button className={s.recipeButton} type="button">
                레시피보기
              </button>
            </div>
            <div className={s.recipePreview} aria-hidden="true">
              <span className={s.recipeIcon} />
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <h1 className={s.title}>오늘의 식단</h1>
        <button className={s.skipButton} type="button">
          건너뛰기
        </button>
      </header>

      <section className={s.summary} aria-label="오늘의 식단 요약">
        <p className={s.date}>{todayLabel}</p>
        <div className={s.summaryDetails}>
          <p>오늘 선택한 메뉴 {dishes.length}개</p>
        </div>
      </section>

      <section className={s.mealSection} aria-labelledby="meal-section-title">
        <h2 id="meal-section-title" className={s.sectionTitle}>
          식사별 메뉴
        </h2>
        {renderMeals()}
      </section>
    </div>
  );
};

export default HomePage;
