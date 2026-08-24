import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CloseIcon,
  InfoIcon,
  SearchIcon,
} from '@/components/icons';
import {
  CATEGORIES,
  useAddUserIngredient,
  useIngredientSearch,
  useRemoveUserIngredient,
  useUserIngredients,
} from '@/services/ingredient';
import { getApiErrorMessage } from '@/api';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { toCategoryId } from '@/utils/ingredient';
import OnboardingGuide from './OnboardingGuide';
import * as s from './style.css';

const MAX_SUGGESTIONS = 8;
const SUGGESTION_LIST_ID = 'ingredient-suggestion-list';

const getSuggestionId = (index: number) => `ingredient-suggestion-${index}`;

const IngredientRegisterPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);
  const searchFieldRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [guideOpen, setGuideOpen] = useState(false);

  const keyword = useDebouncedValue(query.trim());

  // 공용 식재료 마스터 검색 (GET /api/v1/ingredients)
  const search = useIngredientSearch(
    { keyword, activeOnly: true, size: MAX_SUGGESTIONS },
    { enabled: keyword.length > 0 },
  );
  // 유저 보유 식재료 (GET /api/v1/users/{userId}/ingredients)
  const owned = useUserIngredients();
  const addIngredient = useAddUserIngredient();
  const removeIngredient = useRemoveUserIngredient();

  const selected = owned.data?.items ?? [];
  const matches = search.data?.items ?? [];

  const isSelected = (ingredientId: number) =>
    selected.some((item) => item.ingredientId === ingredientId);

  const showSuggest = open && query.trim().length > 0;
  const activeDescendantId =
    showSuggest && activeIndex >= 0 ? getSuggestionId(activeIndex) : undefined;

  useEffect(() => {
    if (!showSuggest || activeIndex < 0) return;
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, showSuggest]);

  const onError = (error: unknown) => window.alert(getApiErrorMessage(error));

  const add = (ingredientId: number) => {
    if (isSelected(ingredientId)) return;
    addIngredient.mutate(
      { ingredientId },
      {
        onSuccess: () => {
          setQuery('');
          setOpen(false);
          setActiveIndex(-1);
          inputRef.current?.focus();
        },
        onError,
      },
    );
  };

  const remove = (ingredientId: number) =>
    removeIngredient.mutate(ingredientId, { onError });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggest || matches.length === 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      const navigableIndices = matches.reduce<number[]>((indices, match, i) => {
        if (!isSelected(match.ingredientId)) indices.push(i);
        return indices;
      }, []);

      setActiveIndex((prev) => {
        if (navigableIndices.length === 0) return -1;
        const currentPosition = navigableIndices.indexOf(prev);
        const nextPosition =
          currentPosition === -1
            ? dir === 1
              ? 0
              : navigableIndices.length - 1
            : (currentPosition + dir + navigableIndices.length) %
              navigableIndices.length;
        return navigableIndices[nextPosition];
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && !isSelected(matches[activeIndex].ingredientId)) {
        add(matches[activeIndex].ingredientId);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <main className={s.screen}>
      <header className={s.appBar}>
        <button
          className={s.backButton}
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon aria-hidden />
        </button>
        <h1 className={s.appBarTitle}>보유 식재료 등록</h1>
        <button
          type="button"
          className={s.appBarInfo}
          aria-label="식재료 등록 안내 보기"
          onClick={() => setGuideOpen(true)}
        >
          <InfoIcon />
        </button>
      </header>

      <div className={s.body}>
        <section>
          <p className={s.lead}>등록한 식재료에 따라 식단을 추천해요</p>

          <div className={s.search}>
            <div
              className={
                showSuggest
                  ? `${s.searchCard} ${s.searchCardOpen}`
                  : s.searchCard
              }
            >
              <div className={s.searchField} ref={searchFieldRef}>
                <input
                  ref={inputRef}
                  className={s.searchInput}
                  type="text"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    setActiveIndex(-1);
                  }}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
                  onKeyDown={handleKeyDown}
                  placeholder="식재료를 검색해 주세요"
                  aria-label="식재료 검색"
                  role="combobox"
                  aria-expanded={showSuggest}
                  aria-controls={SUGGESTION_LIST_ID}
                  aria-activedescendant={activeDescendantId}
                />
                <span className={s.searchIcon} aria-hidden>
                  <SearchIcon />
                </span>
              </div>

              {showSuggest && (
                <>
                  <div className={s.divider} />
                  {search.isFetching && matches.length === 0 ? (
                    <p className={s.suggestEmpty}>검색 중…</p>
                  ) : matches.length === 0 ? (
                    <p className={s.suggestEmpty}>검색 결과가 없습니다.</p>
                  ) : (
                    <ul
                      className={s.suggestList}
                      id={SUGGESTION_LIST_ID}
                      role="listbox"
                    >
                      {matches.map((m, i) => {
                        const added = isSelected(m.ingredientId);
                        const active = i === activeIndex;
                        const itemClassName = [
                          s.suggestItem,
                          added && s.suggestItemAdded,
                          active && s.suggestItemActive,
                        ]
                          .filter(Boolean)
                          .join(' ');
                        return (
                          <li key={m.ingredientId}>
                            <button
                              ref={active ? activeOptionRef : undefined}
                              type="button"
                              id={getSuggestionId(i)}
                              role="option"
                              aria-selected={active}
                              className={itemClassName}
                              // mousedown 으로 등록해 input blur 보다 먼저 처리
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => add(m.ingredientId)}
                            >
                              <span>{m.ingredientName}</span>
                              {added && (
                                <span className={s.addedBadge}>
                                  이미 추가됨
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
          {/*
           * 시안 01 의 검색 안내. s.search 는 높이 44px 에 카드를 absolute 로
           * 띄우는 상자라, 그 안에 두면 카드 뒤로 가려진다. 바깥 형제로 둔다.
           */}
          {!showSuggest && (
            <p className={s.searchHint}>한글로만 검색할 수 있어요.</p>
          )}
        </section>

        <section className={s.categories}>
          {CATEGORIES.map((c) => {
            const items = selected.filter(
              (it) => toCategoryId(it.category) === c.id,
            );
            return (
              <div className={s.category} key={c.id}>
                <h2 className={s.categoryLabel}>{c.label}</h2>
                {items.length > 0 && (
                  <div className={s.chips}>
                    {items.map((it) => (
                      <span className={s.chip} key={it.ingredientId}>
                        {it.ingredientName}
                        <button
                          className={s.chipRemove}
                          type="button"
                          aria-label={`${it.ingredientName} 삭제`}
                          onClick={() => remove(it.ingredientId)}
                        >
                          <CloseIcon aria-hidden />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>

      <div className={s.ctaGradient} aria-hidden />
      <div className={s.ctaDock}>
        <button
          ref={ctaRef}
          className={s.cta}
          type="button"
          disabled={selected.length === 0}
          onClick={() => navigate('/recommend')}
        >
          등록하기
        </button>
      </div>
      {guideOpen && (
        <OnboardingGuide
          searchRef={searchFieldRef}
          ctaRef={ctaRef}
          onClose={() => setGuideOpen(false)}
        />
      )}
    </main>
  );
};

export default IngredientRegisterPage;
