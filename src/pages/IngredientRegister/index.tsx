import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CloseIcon, SearchIcon } from '@/components/icons';
import {
  useAddUserIngredient,
  useIngredientSearch,
} from '@/services/ingredient';
import { useUserId } from '@/services/auth';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { Ingredient } from '@/types';
import * as s from './style.css';

const MAX_SUGGESTIONS = 8;
const SUGGESTION_LIST_ID = 'ingredient-suggestion-list';
const UNCATEGORIZED_LABEL = '기타';

const getSuggestionId = (index: number) => `ingredient-suggestion-${index}`;

const IngredientRegisterPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Ingredient[]>([]);

  const userId = useUserId();
  const addIngredient = useAddUserIngredient();

  const isSelected = (id: number) =>
    selected.some((it) => it.ingredientId === id);

  // 입력이 멈추면 공용 식재료 마스터에서 검색한다.
  const keyword = useDebouncedValue(query.trim(), 200);
  const { data, isFetching } = useIngredientSearch(
    { keyword, size: MAX_SUGGESTIONS, activeOnly: false },
    { enabled: keyword.length > 0 },
  );
  const matches = data?.items ?? [];

  const showSuggest = open && query.trim().length > 0;
  const isSearching = showSuggest && isFetching && matches.length === 0;
  const activeDescendantId =
    showSuggest && activeIndex >= 0 ? getSuggestionId(activeIndex) : undefined;

  useEffect(() => {
    if (!showSuggest || activeIndex < 0) return;
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, showSuggest]);

  const add = (ingredient: Ingredient) => {
    if (isSelected(ingredient.ingredientId)) return;
    setSelected((prev) => [...prev, ingredient]);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const remove = (id: number) => {
    setSelected((prev) => prev.filter((it) => it.ingredientId !== id));
  };

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
      // 직접 입력값이 아니라 선택된 자동완성 항목만 등록
      const match = matches[activeIndex];
      if (match && !isSelected(match.ingredientId)) {
        add(match);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // 선택한 식재료를 카테고리별로 묶는다 (백엔드 category 값 기준).
  const grouped = useMemo(() => {
    const groups = new Map<string, Ingredient[]>();
    for (const it of selected) {
      const label = it.category ?? UNCATEGORIZED_LABEL;
      const bucket = groups.get(label);
      if (bucket) bucket.push(it);
      else groups.set(label, [it]);
    }
    return [...groups.entries()];
  }, [selected]);

  const handleSubmit = async () => {
    if (selected.length === 0 || !userId || addIngredient.isPending) return;
    try {
      await Promise.all(
        selected.map((it) =>
          addIngredient.mutateAsync({ ingredientId: it.ingredientId }),
        ),
      );
      navigate(-1);
    } catch {
      // 실패는 응답 인터셉터가 로깅한다. 버튼 상태만 원복되어 재시도할 수 있다.
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
              <div className={s.searchField}>
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
                  {isSearching ? (
                    <p className={s.suggestEmpty}>검색 중…</p>
                  ) : matches.length === 0 ? (
                    // 검색 결과가 없을 때 입력한 내용을 함께 보여준다
                    <p className={s.suggestEmpty}>
                      ‘{query.trim()}’ 검색 결과가 없어요
                    </p>
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
                              onClick={() => add(m)}
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
        </section>

        <section className={s.categories}>
          {grouped.map(([label, items]) => (
            <div className={s.category} key={label}>
              <h2 className={s.categoryLabel}>{label}</h2>
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
            </div>
          ))}
        </section>
      </div>

      <div className={s.ctaGradient} aria-hidden />
      <div className={s.ctaDock}>
        <button
          className={s.cta}
          type="button"
          disabled={selected.length === 0 || !userId || addIngredient.isPending}
          onClick={handleSubmit}
        >
          {addIngredient.isPending ? '등록 중…' : '등록하기'}
        </button>
      </div>
    </main>
  );
};

export default IngredientRegisterPage;
