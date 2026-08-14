import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { ArrowBackIcon, InfoIcon, SearchIcon } from '@/components/icons';
import type { DictionaryItem } from '@/types';
import { DICTIONARY } from '@/services/ingredient';
import * as s from './style.css';

const MAX_SUGGESTIONS = 8;
const SUGGESTION_LIST_ID = 'onboarding-ingredient-suggestion-list';
const suggestionOptionId = (index: number) =>
  `onboarding-ingredient-suggestion-${index}`;

// 화면 전체를 덮는 반투명 블로킹 오버레이. 트리거는 아직 정해지지 않아
// 모양만 준비해두고 기본값은 숨김으로 둔다.
const IS_GUIDE_OVERLAY_VISIBLE = true; // TODO: 실제 트리거에 따라 상태 관리 필요

// 온보딩 첫 스텝: 뒤로 갈 곳이 없어 앱바 뒤로가기 버튼은 없음.
// 하단 CTA는 튜토리얼 안내용으로 색상만 유지하고 실제 등록/다음 이동 동작은 하지 않음.
const IngredientStep = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const activeSuggestionRef = useRef<HTMLButtonElement>(null);

  const [keyword, setKeyword] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [ownedIngredients, setOwnedIngredients] = useState<DictionaryItem[]>(
    [],
  );

  const isOwned = (name: string) =>
    ownedIngredients.some((item) => item.name === name);

  // 사전에서 검색어를 포함하는 항목 (이미 담은 항목도 목록에 남겨 표시)
  const suggestions = useMemo(() => {
    const trimmed = keyword.trim();
    if (!trimmed) return [];
    return DICTIONARY.filter((item) => item.name.includes(trimmed)).slice(
      0,
      MAX_SUGGESTIONS,
    );
  }, [keyword]);

  const isSuggestionListVisible = isSearchFocused && keyword.trim().length > 0;
  const activeDescendantId =
    isSuggestionListVisible && activeSuggestionIndex >= 0
      ? suggestionOptionId(activeSuggestionIndex)
      : undefined;

  useEffect(() => {
    if (!isSuggestionListVisible || activeSuggestionIndex < 0) return;
    activeSuggestionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeSuggestionIndex, isSuggestionListVisible]);

  const addIngredient = (name: string) => {
    const dictionaryEntry = DICTIONARY.find((item) => item.name === name);
    if (!dictionaryEntry || isOwned(name)) return; // 사전에 없는 단어는 등록 불가
    setOwnedIngredients((prev) => [...prev, dictionaryEntry]);
    setKeyword('');
    setIsSearchFocused(false);
    setActiveSuggestionIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isSuggestionListVisible || suggestions.length === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      const selectableIndices = suggestions.reduce<number[]>(
        (indices, item, index) => {
          if (!isOwned(item.name)) indices.push(index);
          return indices;
        },
        [],
      );

      setActiveSuggestionIndex((prev) => {
        if (selectableIndices.length === 0) return -1;

        const currentPosition = selectableIndices.indexOf(prev);
        const nextPosition =
          currentPosition === -1
            ? step === 1
              ? 0
              : selectableIndices.length - 1
            : (currentPosition + step + selectableIndices.length) %
              selectableIndices.length;

        return selectableIndices[nextPosition];
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // 직접 입력값이 아니라 목록에서 활성화된 항목만 등록
      const active = suggestions[activeSuggestionIndex];
      if (active && !isOwned(active.name)) addIngredient(active.name);
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
      setActiveSuggestionIndex(-1);
    }
  };

  return (
    <main className={s.screen}>
      <header className={s.appBar}>
        <div className={s.appBarLeft}>
          {/* 온보딩 첫 스텝이라 실제로 뒤로 갈 곳은 없음: 모양만 존재하는 버튼 */}
          <button
            className={s.backButton}
            type="button"
            aria-label="뒤로가기"
          >
            <ArrowBackIcon aria-hidden />
          </button>
          <h1 className={s.appBarTitle}>보유 식재료 등록</h1>
        </div>
        <InfoIcon className={s.appBarInfoIcon} aria-hidden />
      </header>

      <div className={s.body}>
        <section>
          <div className={s.leadRow}>
            <p className={s.lead}>등록한 식재료에 따라 식단을 추천해요</p>
            <InfoIcon className={s.leadInfoIcon} aria-hidden />
          </div>

          <div className={s.searchArea}>
            <div
              className={
                isSuggestionListVisible
                  ? `${s.searchCard} ${s.searchCardOpen}`
                  : s.searchCard
              }
            >
              <div className={s.searchField}>
                <input
                  ref={searchInputRef}
                  className={s.searchInput}
                  type="text"
                  autoComplete="off"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setIsSearchFocused(true);
                    setActiveSuggestionIndex(-1);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="식재료를 검색해 주세요"
                  aria-label="식재료 검색"
                  role="combobox"
                  aria-expanded={isSuggestionListVisible}
                  aria-controls={SUGGESTION_LIST_ID}
                  aria-activedescendant={activeDescendantId}
                />
                <span className={s.searchIcon} aria-hidden>
                  <SearchIcon />
                </span>
              </div>

              {isSuggestionListVisible && (
                <>
                  <div className={s.divider} />
                  {suggestions.length === 0 ? (
                    // 검색 결과가 없을 때 입력한 내용을 함께 보여준다
                    <p className={s.emptyResult}>
                      ‘{keyword.trim()}’ 검색 결과가 없어요
                    </p>
                  ) : (
                    <ul
                      className={s.suggestionList}
                      id={SUGGESTION_LIST_ID}
                      role="listbox"
                    >
                      {suggestions.map((item, index) => {
                        const owned = isOwned(item.name);
                        const active = index === activeSuggestionIndex;
                        const className = [
                          s.suggestionItem,
                          owned && s.suggestionItemOwned,
                          active && s.suggestionItemActive,
                        ]
                          .filter(Boolean)
                          .join(' ');
                        return (
                          <li key={item.name}>
                            <button
                              ref={active ? activeSuggestionRef : undefined}
                              type="button"
                              id={suggestionOptionId(index)}
                              role="option"
                              aria-selected={active}
                              className={className}
                              // mousedown 으로 등록해 input blur 보다 먼저 처리
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => addIngredient(item.name)}
                            >
                              <span>{item.name}</span>
                              {owned && (
                                <span className={s.ownedBadge}>
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
      </div>

      <div className={s.ctaGradient} aria-hidden />
      <div className={s.ctaDock}>
        {/* 튜토리얼 안내용 CTA: 색상은 항상 활성 상태로 유지하되 실제 동작은 없음 */}
        <button className={s.cta} type="button">
          등록하기
        </button>
      </div>

      {IS_GUIDE_OVERLAY_VISIBLE && <div className={s.guideOverlay} />}
    </main>
  );
};

export default IngredientStep;
