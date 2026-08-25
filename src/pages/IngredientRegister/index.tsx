import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Screen } from '@/components/layout';
import { Button, Chip, SearchInput } from '@/components/common';
import { ROUTES } from '@/constants';
import type { Ingredient, UserIngredient } from '@/types';
import {
  useAddUserIngredient,
  useIngredientSearch,
  useRemoveUserIngredient,
  useUserIngredients,
} from '@/services/ingredient';
import * as s from './style.css';

const MAX_SUGGESTIONS = 8;
const UNCATEGORIZED = '기타';

/** 보유 재료를 카테고리별로 묶는다. 카테고리가 없는 항목은 '기타' 로 모은다. */
const groupByCategory = (items: UserIngredient[]) => {
  const groups = new Map<string, UserIngredient[]>();
  items.forEach((item) => {
    const key = item.category ?? UNCATEGORIZED;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });
  return [...groups.entries()];
};

const IngredientRegisterPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const keyword = query.trim();

  // 공용 식재료 마스터 검색 (GET /ingredients, 페이징 응답의 items 를 쓴다).
  const { data: searchResult } = useIngredientSearch(
    { keyword, size: MAX_SUGGESTIONS, activeOnly: true },
    { enabled: keyword.length > 0 },
  );

  const { data: owned, isLoading } = useUserIngredients();
  const addIngredient = useAddUserIngredient();
  const removeIngredient = useRemoveUserIngredient();

  const ownedItems = useMemo(() => owned?.items ?? [], [owned]);
  const ownedIds = useMemo(
    () => new Set(ownedItems.map((item) => item.ingredientId)),
    [ownedItems],
  );

  const suggestions = keyword ? (searchResult?.items ?? []) : [];
  const groups = groupByCategory(ownedItems);

  const add = (ingredient: Ingredient) => {
    if (ownedIds.has(ingredient.ingredientId)) return;
    addIngredient.mutate({ ingredientId: ingredient.ingredientId });
    setQuery('');
  };

  return (
    <Screen
      bottomCta={
        <Button
          disabled={ownedItems.length === 0}
          onClick={() => navigate(ROUTES.HOME)}
        >
          등록하기
        </Button>
      }
    >
      <AppBar title="보유 식재료 등록" onBack={() => navigate(-1)} />

      <section className={s.searchSection}>
        <p className={s.lead}>등록한 식재료에 따라 식단을 추천해요</p>
        <SearchInput
          value={query}
          onChange={setQuery}
          suggestions={suggestions}
          onSelect={add}
          getKey={(item) => String(item.ingredientId)}
          getLabel={(item) => item.ingredientName}
          isDisabled={(item) => ownedIds.has(item.ingredientId)}
          disabledBadge="이미 추가됨"
          placeholder="식재료를 검색해 주세요"
          label="식재료 검색"
        />
      </section>

      {!isLoading && ownedItems.length === 0 && (
        <p className={s.empty}>아직 등록한 식재료가 없어요.</p>
      )}

      <section className={s.categories}>
        {groups.map(([category, items]) => (
          <div className={s.category} key={category}>
            <h2 className={s.categoryLabel}>{category}</h2>
            <div className={s.chips}>
              {items.map((item) => (
                <Chip
                  key={item.ingredientId}
                  label={item.ingredientName}
                  onRemove={() => removeIngredient.mutate(item.ingredientId)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </Screen>
  );
};

export default IngredientRegisterPage;
