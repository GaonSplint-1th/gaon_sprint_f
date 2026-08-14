import { useNavigate } from 'react-router-dom';
import * as s from './style.css';

const meals = [
  { time: '아침', name: '계란찜', detail: '약 5,800원' },
  { time: '점심', name: '제육볶음', detail: '조리 25분' },
  { time: '저녁', name: '김치찌개', detail: '약 5,800원' },
];

const MenuCard = ({ meal }: { meal: (typeof meals)[number] }) => (
  <article className={s.mealCard}>
    <div className={s.mealInfo}>
      <h3 className={s.mealTime}>{meal.time}</h3>
      <p className={s.mealName}>{meal.name}</p>
      <p className={s.mealDetail}>{meal.detail}</p>
      <button type="button" className={s.recipeButton}>
        레시피보기
      </button>
    </div>
    <div className={s.recipePreview} aria-hidden="true">
      <span className={s.recipeIcon} />
    </div>
  </article>
);

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <h1 className={s.title}>오늘의 식단</h1>
      </header>
      <div className={s.dateBar}>
        ‹ <strong>7/30(목)</strong> ›
      </div>
      <div className={s.costBar}>17400원</div>
      <section className={s.mealSection} aria-labelledby="meal-section-title">
        <h2 id="meal-section-title" className={s.sectionTitle}>
          식사별 메뉴
        </h2>
        <div className={s.mealList}>
          {meals.map((meal) => (
            <MenuCard key={meal.time} meal={meal} />
          ))}
        </div>
      </section>
      <button
        type="button"
        className={s.bottomButton}
        onClick={() => navigate('/recommend/loading')}
      >
        식단 추천
      </button>
    </div>
  );
};

export default HomePage;
