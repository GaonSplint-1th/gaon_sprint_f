import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { SearchIcon } from '@/components/icons';
import * as s from './style.css';

interface SearchInputProps<T> {
  value: string;
  onChange: (value: string) => void;
  /** 현재 입력값에 대한 자동완성 후보. 필터링은 호출하는 쪽 책임. */
  suggestions: T[];
  onSelect: (item: T) => void;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  /** true 인 항목은 목록에 남되 선택·키보드 이동에서 제외된다. */
  isDisabled?: (item: T) => boolean;
  /** 위 조건에 걸린 항목 옆에 붙는 설명. 예) 이미 추가됨 */
  disabledBadge?: string;
  placeholder?: string;
  label: string;
  emptyMessage?: (query: string) => string;
}

/**
 * 검색 입력 + 자동완성 목록 (Input.svg).
 * 입력창과 목록이 하나의 카드로 이어지고, 열리면 아래 콘텐츠 위에 겹쳐 확장된다.
 * combobox 접근성(role/aria-activedescendant/방향키·Enter·ESC)을 여기서 처리한다.
 */
const SearchInput = <T,>({
  value,
  onChange,
  suggestions,
  onSelect,
  getKey,
  getLabel,
  isDisabled,
  disabledBadge,
  placeholder,
  label,
  emptyMessage = (query) => `‘${query}’ 검색 결과가 없어요`,
}: SearchInputProps<T>) => {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const query = value.trim();
  const isExpanded = isOpen && query.length > 0;

  /** 키보드로 이동할 수 있는(비활성이 아닌) 항목의 인덱스. */
  const navigableIndices = useMemo(
    () =>
      suggestions.reduce<number[]>((indices, item, index) => {
        if (!isDisabled?.(item)) indices.push(index);
        return indices;
      }, []),
    [suggestions, isDisabled],
  );

  useEffect(() => {
    if (!isExpanded || activeIndex < 0) return;
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isExpanded]);

  const getOptionId = (index: number) => `${listId}-option-${index}`;

  const select = (item: T) => {
    if (isDisabled?.(item)) return;
    onSelect(item);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isExpanded) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (navigableIndices.length === 0) return;

      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((previous) => {
        const position = navigableIndices.indexOf(previous);
        if (position === -1) {
          return step === 1
            ? navigableIndices[0]
            : navigableIndices[navigableIndices.length - 1];
        }
        const next =
          (position + step + navigableIndices.length) % navigableIndices.length;
        return navigableIndices[next];
      });
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      // 직접 입력한 문자열이 아니라 목록에서 고른 항목만 반영한다.
      if (activeIndex >= 0) select(suggestions[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={s.root}>
      <div className={isExpanded ? `${s.card} ${s.cardOpen}` : s.card}>
        <div className={s.field}>
          <input
            ref={inputRef}
            className={s.input}
            type="text"
            autoComplete="off"
            value={value}
            placeholder={placeholder}
            aria-label={label}
            role="combobox"
            aria-expanded={isExpanded}
            aria-controls={listId}
            aria-activedescendant={
              isExpanded && activeIndex >= 0
                ? getOptionId(activeIndex)
                : undefined
            }
            onChange={(event) => {
              onChange(event.target.value);
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onKeyDown={handleKeyDown}
          />
          <span className={s.icon}>
            <SearchIcon />
          </span>
        </div>

        {isExpanded && (
          <>
            <div className={s.divider} />

            {suggestions.length === 0 ? (
              <p className={s.empty}>{emptyMessage(query)}</p>
            ) : (
              <ul
                className={s.list}
                id={listId}
                role="listbox"
                aria-label={label}
              >
                {suggestions.map((item, index) => {
                  const disabled = Boolean(isDisabled?.(item));
                  const active = index === activeIndex;
                  const className = [
                    s.option,
                    disabled && s.optionDisabled,
                    active && s.optionActive,
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <li key={getKey(item)}>
                      <button
                        ref={active ? activeOptionRef : undefined}
                        type="button"
                        id={getOptionId(index)}
                        role="option"
                        aria-selected={active}
                        aria-disabled={disabled}
                        className={className}
                        // input 의 blur 보다 먼저 처리해 목록이 닫히기 전에 선택되게 한다.
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => select(item)}
                      >
                        <span>{getLabel(item)}</span>
                        {disabled && disabledBadge && (
                          <span className={s.optionBadge}>{disabledBadge}</span>
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
  );
};

export default SearchInput;
