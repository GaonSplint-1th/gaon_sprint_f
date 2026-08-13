import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as s from './style.css';

type View = 'home' | 'recommend' | 'edit' | 'loading';

const Skeleton = () => (
  <div className={s.screen}>
    <div className={s.skeletonTitle}>
      <i />
      <b />
    </div>
    {[1, 2, 3].map((item) => (
      <div className={s.skeletonCard} key={item}>
        <i />
        <div>
          <b />
          <b />
          <b />
        </div>
        <em />
        <b />
      </div>
    ))}
    <div className={s.skeletonButton} />
  </div>
);

const meals = [
  { time: '아침', name: '메뉴명', detail: '약 000원' },
  { time: '점심', name: '제육볶음', detail: '조리 25분' },
  { time: '저녁', name: '김치찌개', detail: '약 000원' },
];

const MenuCard = ({
  meal,
  edit = false,
}: {
  meal: (typeof meals)[number];
  edit?: boolean;
}) => (
  <article className={s.mealCard}>
    <div className={s.mealInfo}>
      <h3 className={s.mealTime}>
        {edit ? (meal.time === '저녁' ? '저녁' : '미정') : meal.time}
      </h3>
      <p className={s.mealName}>
        {edit && meal.time !== '저녁' ? '메뉴명' : meal.name}
      </p>
      <p className={s.mealDetail}>{edit ? '약 000원' : meal.detail}</p>
      <button className={s.recipeButton} type="button">
        레시피보기
      </button>
    </div>
    <div className={s.recipePreview}>
      <span className={s.recipeIcon} />
    </div>
  </article>
);

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => (
  <header className={s.pageTitle}>
    {onBack && (
      <button className={s.backButton} onClick={onBack} aria-label="뒤로가기">
        ‹
      </button>
    )}
    <h1 className={s.title}>{title}</h1>
    {onBack && <span className={s.infoIcon}>i</span>}
  </header>
);

const Recommendation = ({
  onBack,
  onEdit,
}: {
  onBack: () => void;
  onEdit: () => void;
}) => {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState(false);
  return (
    <div className={s.screen}>
      <Header title="식단 추천" onBack={onBack} />
      <div className={s.recommendList}>
        {[0, 1, 2].map((item) => (
          <article
            key={item}
            className={`${s.recommendCard} ${selected === item ? s.selectedCard : ''}`}
            onClick={() => setSelected(item)}
          >
            <div className={s.recommendTop}>
              <strong>육류 위주 A</strong>
              <span>예상 118,000원</span>
            </div>
            <div className={s.imageRow}>
              {[1, 2, 3].map((x) => (
                <div className={s.placeholder} key={x}>
                  이미지
                </div>
              ))}
            </div>
            <p className={s.ingredients}>제육볶음 · 김치찌개 · 계란찜</p>
            <button
              className={s.previewButton}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setPreview(true);
              }}
            >
              미리보기 ›
            </button>
          </article>
        ))}
      </div>
      <button className={s.bottomButton} onClick={onEdit}>
        메뉴 수정하기
      </button>
      {preview && (
        <div className={s.modalBackdrop} onClick={() => setPreview(false)}>
          <div
            className={s.previewModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={s.modalHeader}>
              <strong>육류 위주 A</strong>
              <button onClick={() => setPreview(false)}>×</button>
            </div>
            <div className={s.modalBody}>
              {[1, 2, 3].map((day) => (
                <div key={day}>
                  <p>월/일(요일)</p>
                  <div className={s.dayMeals}>
                    {['아침메뉴', '점심메뉴', '저녁메뉴'].map((meal) => (
                      <div className={s.dayMeal} key={meal}>
                        <div className={s.modalPlaceholder} />
                        {meal}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className={s.modalClose} onClick={() => setPreview(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState<View>(
    location.pathname === '/recommend/loading'
      ? 'loading'
      : location.pathname === '/recommend'
        ? 'recommend'
        : location.pathname === '/edit'
          ? 'edit'
          : 'home',
  );
  const go = (next: View, path: string) => {
    setView(next);
    navigate(path);
  };
  if (view === 'recommend')
    return (
      <Recommendation
        onBack={() => go('home', '/')}
        onEdit={() => go('edit', '/edit')}
      />
    );
  if (view === 'loading') return <Skeleton />;
  if (view === 'edit')
    return (
      <div className={s.screen}>
        <Header
          title="식단 수정"
          onBack={() => go('recommend', '/recommend')}
        />
        <h2 className={s.planTitle}>육류 위주 A</h2>
        <p className={s.planDescription}>
          스크롤하여 메뉴를 변경할 수 있습니다.
        </p>
        <div className={s.dateBar}>
          ‹ <strong>7/30(목)</strong> ›
        </div>
        <div className={s.costBar}>17400원</div>
        <div className={s.editScroll}>
          <div className={s.swipeMeals}>
            {meals.map((meal) => (
              <MenuCard key={meal.time} meal={meal} edit />
            ))}
          </div>
        </div>
        <button className={`${s.bottomButton} ${s.disabledButton}`}>
          확정하기(0/7)
        </button>
      </div>
    );
  return (
    <div className={s.screen}>
      <Header title="오늘의 식단" />
      <div className={s.dateBar}>
        ‹ <strong>7/30(목)</strong> ›
      </div>
      <div className={s.costBar}>17400원</div>
      <section className={s.mealSection}>
        <h2 className={s.sectionTitle}>식사별 메뉴</h2>
        <div className={s.mealList}>
          {meals.map((meal) => (
            <MenuCard key={meal.time} meal={meal} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
