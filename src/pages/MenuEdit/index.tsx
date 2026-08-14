import { useNavigate } from 'react-router-dom';
import * as s from '../Home/style.css';

const meals = [
  { time: '아침', name: '계란찜', detail: '약 5,800원' },
  { time: '점심', name: '제육볶음', detail: '조리 25분' },
  { time: '저녁', name: '김치찌개', detail: '약 5,800원' },
];

const MenuEditPage = () => {
  const navigate = useNavigate();
  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate('/recommend')}
          aria-label="뒤로가기"
        >
          ‹
        </button>
        <h1 className={s.title}>식단 수정</h1>
        <span className={s.infoIcon}>i</span>
      </header>
      <h2 className={s.planTitle}>육류 위주 A</h2>
      <p className={s.planDescription}>스크롤하여 메뉴를 변경할 수 있습니다.</p>
      <div className={s.dateBar}>
        ‹ <strong>7/30(목)</strong> ›
      </div>
      <div className={s.costBar}>17400원</div>
      <div className={s.editScroll}>
        <div className={s.swipeMeals}>
          {meals.map((meal) => (
            <article className={s.mealCard} key={meal.time}>
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
          ))}
        </div>
      </div>
      <button type="button" className={`${s.bottomButton} ${s.disabledButton}`}>
        확정하기(0/7)
      </button>
    </div>
  );
};

export default MenuEditPage;
