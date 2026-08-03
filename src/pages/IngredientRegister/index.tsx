import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INGREDIENT_CATEGORIES } from './mock';
import * as s from './style.css';

const IngredientRegisterPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  // 검색어로 필터링하고, 남은 항목이 없는 카테고리는 제외
  const filtered = useMemo(() => {
    const q = keyword.trim();
    return INGREDIENT_CATEGORIES.map((category) => ({
      ...category,
      items: q
        ? category.items.filter((item) => item.includes(q))
        : category.items,
    })).filter((category) => category.items.length > 0);
  }, [keyword]);

  return (
    <main className={s.screen}>
      <header className={s.appBar}>
        <button
          className={s.backButton}
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M15.29 3.79a1 1 0 0 0-1.41 0L6.7 10.96a1.47 1.47 0 0 0 0 2.08l7.18 7.17a1 1 0 0 0 1.41-1.41L8.81 12l6.48-6.79a1 1 0 0 0 0-1.42Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <h1 className={s.appBarTitle}>보유 식재료 등록</h1>
      </header>

      <p className={s.intro}>
        보유한 식재료를 선택하면
        <br />
        예산에 맞는 식단을 추천해요.
      </p>

      <input
        className={s.search}
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="식재료를 검색해 주세요"
        aria-label="식재료 검색"
      />

      <div className={s.groups}>
        {filtered.length === 0 ? (
          <p className={s.empty}>“{keyword}” 검색 결과가 없습니다.</p>
        ) : (
          filtered.map((category) => (
            <section key={category.label}>
              <h2 className={s.groupLabel}>{category.label}</h2>
              <ul className={s.chips}>
                {category.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      aria-pressed={selected.has(item)}
                      className={
                        selected.has(item)
                          ? `${s.chip} ${s.chipSelected}`
                          : s.chip
                      }
                      onClick={() => toggle(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <button className={s.submit} type="button" disabled={selected.size === 0}>
        등록하기{selected.size > 0 && ` (${selected.size})`}
      </button>
    </main>
  );
};

export default IngredientRegisterPage;
