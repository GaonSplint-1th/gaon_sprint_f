import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CloseIcon, SearchIcon } from '@/components/icons';
import type { DictionaryItem } from '@/types';
import { CATEGORIES, DICTIONARY } from '@/services/ingredient';
import * as s from './style.css';

const MAX_SUGGESTIONS = 8;
const SUGGESTION_LIST_ID = 'ingredient-suggestion-list';

const getSuggestionId = (index: number) => `ingredient-suggestion-${index}`;

const IngredientRegisterPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<DictionaryItem[]>([]);

  const isSelected = (name: string) => selected.some((it) => it.name === name);

  // 사전에서 검색어를 포함하는 항목 (이미 추가된 항목도 목록에 남겨 표시)
  const matches = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return DICTIONARY.filter((d) => d.name.includes(q)).slice(
      0,
      MAX_SUGGESTIONS,
    );
  }, [query]);

  const showSuggest = open && query.trim().length > 0;
  const activeDescendantId =
    showSuggest && activeIndex >= 0 ? getSuggestionId(activeIndex) : undefined;

  useEffect(() => {
    if (!showSuggest || activeIndex < 0) return;
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, showSuggest]);

  const add = (name: string) => {
    const entry = DICTIONARY.find((d) => d.name === name);
    if (!entry || isSelected(name)) return; // 사전에 없는 단어는 등록 불가
    setSelected((prev) => [
      ...prev,
      { name: entry.name, category: entry.category },
    ]);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const remove = (name: string) => {
    setSelected((prev) => prev.filter((it) => it.name !== name));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggest || matches.length === 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      const navigableIndices = matches.reduce<number[]>((indices, match, i) => {
        if (!isSelected(match.name)) indices.push(i);
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
      if (activeIndex >= 0 && !isSelected(matches[activeIndex].name)) {
        add(matches[activeIndex].name);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    // TODO: 등록 완료 화면으로 이동 (식재료 등록 완료)
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
                  {matches.length === 0 ? (
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
                        const added = isSelected(m.name);
                        const active = i === activeIndex;
                        const itemClassName = [
                          s.suggestItem,
                          added && s.suggestItemAdded,
                          active && s.suggestItemActive,
                        ]
                          .filter(Boolean)
                          .join(' ');
                        return (
                          <li key={m.name}>
                            <button
                              ref={active ? activeOptionRef : undefined}
                              type="button"
                              id={getSuggestionId(i)}
                              role="option"
                              aria-selected={active}
                              className={itemClassName}
                              // mousedown 으로 등록해 input blur 보다 먼저 처리
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => add(m.name)}
                            >
                              <span>{m.name}</span>
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
          {CATEGORIES.map((c) => {
            const items = selected.filter((it) => it.category === c.id);
            return (
              <div className={s.category} key={c.id}>
                <h2 className={s.categoryLabel}>{c.label}</h2>
                {items.length > 0 && (
                  <div className={s.chips}>
                    {items.map((it) => (
                      <span className={s.chip} key={it.name}>
                        {it.name}
                        <button
                          className={s.chipRemove}
                          type="button"
                          aria-label={`${it.name} 삭제`}
                          onClick={() => remove(it.name)}
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
          className={s.cta}
          type="button"
          disabled={selected.length === 0}
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </main>
  );
};

export default IngredientRegisterPage;
