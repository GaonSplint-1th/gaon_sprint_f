import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@/components/icons';
import * as s from '../Home/style.css';

const options = [
  ['계란찜', '오트밀'],
  ['제육볶음', '닭가슴살'],
  ['김치찌개', '된장찌개'],
];

const MenuEditPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([0, 0, 0]);
  const changedCount = useMemo(
    () => selected.filter((value) => value !== 0).length,
    [selected],
  );
  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate('/recommend')}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={s.title}>식단 수정</h1>
        <span className={s.infoIcon}>i</span>
      </header>
      <h2 className={s.planTitle}>육류 위주 A</h2>
      <p className={s.planDescription}>
        좌우로 밀어 메뉴를 변경할 수 있습니다.
      </p>
      <div className={s.dateBar}>
        ‹ <strong>7/30(목)</strong> ›
      </div>
      <div className={s.costBar}>17400원</div>
      <div className={s.editScroll}>
        <div className={s.swipeMeals}>
          {options.map((mealOptions, mealIndex) => (
            <article className={s.mealCard} key={mealIndex}>
              <div className={s.mealInfo}>
                <h3 className={s.mealTime}>
                  {['아침', '점심', '저녁'][mealIndex]}
                </h3>
                <div
                  className={s.menuSwipe}
                  tabIndex={0}
                  aria-label="메뉴 선택"
                >
                  <div className={s.menuSwipeTrack}>
                    {mealOptions.map((menu, optionIndex) => (
                      <button
                        type="button"
                        className={`${s.menuOption} ${selected[mealIndex] === optionIndex ? s.activeMenuOption : ''}`}
                        onClick={() =>
                          setSelected((current) =>
                            current.map((value, index) =>
                              index === mealIndex ? optionIndex : value,
                            ),
                          )
                        }
                        key={menu}
                      >
                        {menu}
                      </button>
                    ))}
                  </div>
                </div>
                <p className={s.mealDetail}>
                  {mealIndex === 1 ? '조리 25분' : '약 5,800원'}
                </p>
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
      <button
        type="button"
        className={`${s.bottomButton} ${changedCount === 0 ? s.disabledButton : ''}`}
        disabled={changedCount === 0}
        onClick={() => window.alert('식단이 확정되었습니다.')}
      >
        확정하기({changedCount}/7)
      </button>
    </div>
  );
};
export default MenuEditPage;
