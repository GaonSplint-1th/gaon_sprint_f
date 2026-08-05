import * as s from './style.css';

interface Meal {
  time: string;
  name: string;
  detail: string;
}

const MEALS: Meal[] = [
  { time: '아침', name: '계란 토스트', detail: '약 1700원' },
  { time: '점심', name: '제육볶음', detail: '조리 25분' },
  { time: '저녁', name: '김치찌개', detail: '약 1700원' },
];

const HomePage = () => {
  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <h1 className={s.title}>오늘의 식단</h1>
        <button className={s.skipButton} type="button">
          건너뛰기
        </button>
      </header>

      <section className={s.summary} aria-label="오늘의 식단 요약">
        <p className={s.date}>7/30 (목)</p>
        <div className={s.summaryDetails}>
          <p>오늘 선택한 메뉴 3개</p>
          <p>예상 17,400원</p>
        </div>
      </section>

      <section className={s.mealSection} aria-labelledby="meal-section-title">
        <h2 id="meal-section-title" className={s.sectionTitle}>
          식사별 메뉴
        </h2>

        <div className={s.mealList}>
          {MEALS.map((meal) => (
            <article className={s.mealCard} key={meal.time}>
              <div className={s.mealInfo}>
                <h3 className={s.mealTime}>{meal.time}</h3>
                <p className={s.mealName}>{meal.name}</p>
                <p className={s.mealDetail}>{meal.detail}</p>
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
      </section>
    </div>
  );
};

export default HomePage;
