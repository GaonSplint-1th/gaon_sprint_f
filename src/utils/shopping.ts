import type { MenuPrice, ShoppingListItemInput } from '@/types';

/** 재료 한 종의 주간 합계. 여러 끼니에 걸친 필요량을 더하고, 어느 요리에 쓰는지 모은다. */
export interface IngredientUsage {
  ingredientId: number;
  name: string;
  category: string | null;
  /** 이 식단이 한 주 동안 쓰는 양. 보유 식재료를 빼지 않은 전량이다. */
  requiredGrams: number;
  ingredientPriceId: number | null;
  /** 이 재료가 들어가는 요리 이름 (중복 제거). */
  dishNames: string[];
}

/**
 * 가격 계산 응답(21끼 내역)을 재료 단위로 접는다.
 *
 * 보유 식재료는 빼지 않는다. 응답의 `pricedGrams`(= requiredGrams − ownedGrams)와
 * `cost` 를 쓰지 않고 `requiredGrams` 만 더하는 이유다. 집에 뭐가 있는지는
 * 마트에 선 사람이 판단하고, 화면은 요리에 들어가는 전량을 보여 준다.
 */
export const foldIngredients = (
  price: MenuPrice | undefined,
): IngredientUsage[] => {
  if (!price) return [];

  const folded = new Map<number, IngredientUsage>();

  for (const dish of price.items) {
    for (const ingredient of dish.ingredients) {
      const required = ingredient.requiredGrams ?? 0;
      const existing = folded.get(ingredient.ingredientId);

      if (!existing) {
        folded.set(ingredient.ingredientId, {
          ingredientId: ingredient.ingredientId,
          name: ingredient.ingredientName,
          category: ingredient.category,
          requiredGrams: required,
          ingredientPriceId: ingredient.ingredientPriceId,
          dishNames: [dish.dishName],
        });
        continue;
      }

      existing.requiredGrams += required;
      // 같은 재료라도 끼니마다 가격 행이 다를 수 있다. 먼저 잡힌 것을 쓴다.
      existing.ingredientPriceId ??= ingredient.ingredientPriceId;
      if (!existing.dishNames.includes(dish.dishName)) {
        existing.dishNames.push(dish.dishName);
      }
    }
  }

  return [...folded.values()];
};

/**
 * 영수증 발행 요청에 실을 항목.
 *
 * 필요량이 0 이하인 재료는 뺀다. 백엔드가 `quantityGrams > 0` 을 요구하기도 하고,
 * 얼마나 쓰는지 모르는 재료는 영수증에 적을 말이 없기 때문이다.
 */
export const toShoppingListItems = (
  price: MenuPrice | undefined,
): ShoppingListItemInput[] =>
  foldIngredients(price)
    .filter((usage) => usage.requiredGrams > 0)
    .map((usage) => ({
      ingredientId: usage.ingredientId,
      ...(usage.ingredientPriceId != null
        ? { ingredientPriceId: usage.ingredientPriceId }
        : {}),
      quantityGrams: Math.round(usage.requiredGrams),
    }));

/** 중량 표기. 1000g 이상은 kg 로 접는다. */
export const formatGrams = (grams: number | null | undefined): string => {
  if (grams == null) return '-';
  if (grams < 1000) return `${Math.round(grams)}g`;
  const kg = grams / 1000;
  return `${Number.isInteger(kg) ? kg : kg.toFixed(1)}kg`;
};

/** 이름 안에 이미 용량이 적혀 있는가 — `100g`, `1개(250g)`, `1L`. */
const CARRIES_WEIGHT = /\d\s*(kg|g|ml|l)\b/i;

/**
 * 구매 단위 표기 — `1망 (1.5kg)`. 단위를 모르면 undefined.
 *
 * `ingredient_price.unit_name` 에는 판매 단위(`1망`)와 조사 기준가(`100g`)가 섞여 있고,
 * `1개(250g)` 처럼 용량을 품은 값도 있다. 그런 이름에 괄호를 덧붙이면 같은 말을
 * 두 번 하거나(`100g (100g)`) 액체를 무게로 바꿔 말하게 된다(`1L (1kg)`).
 */
export const formatUnit = (
  unitName: string | null,
  unitGrams: number | null,
): string | undefined => {
  if (!unitName) return undefined;
  if (unitGrams == null || CARRIES_WEIGHT.test(unitName)) return unitName;
  return `${unitName} (${formatGrams(unitGrams)})`;
};

/**
 * 구매 단위를 몇 개 사야 하는가.
 *
 * 한 단위로 모자라는 재료가 흔하다 — 밥 210g 단위에 한 주 840g 이면 4 개다.
 * 그런 재료를 1 개로 세면 영수증 합계가 실제 계산대 금액보다 적게 나온다.
 * 단위를 모르면 1 개로 본다.
 */
export const packCount = (
  requiredGrams: number | null,
  unitGrams: number | null,
): number => {
  if (requiredGrams == null || unitGrams == null || unitGrams <= 0) return 1;
  return Math.max(1, Math.ceil(requiredGrams / unitGrams));
};

/** 실제로 계산대에서 낼 금액 = 단위 가격 × 구매 개수. 가격을 모르면 null. */
export const lineTotal = (
  unitPrice: number | null,
  requiredGrams: number | null,
  unitGrams: number | null,
): number | null =>
  unitPrice == null ? null : unitPrice * packCount(requiredGrams, unitGrams);

/** 산 양 전체 (단위 × 개수). 단위를 모르면 null. */
export const boughtGrams = (
  requiredGrams: number | null,
  unitGrams: number | null,
): number | null =>
  unitGrams == null || unitGrams <= 0
    ? null
    : unitGrams * packCount(requiredGrams, unitGrams);

/**
 * 산 양 중 실제로 쓰는 비율 (0~1). 단위를 모르면 null.
 * 분모는 한 단위가 아니라 사야 하는 전체 양이다 — 4 팩을 사면 4 팩이 기준이다.
 */
export const usageRatio = (
  requiredGrams: number | null,
  unitGrams: number | null,
): number | null => {
  const bought = boughtGrams(requiredGrams, unitGrams);
  if (requiredGrams == null || bought == null) return null;
  return Math.min(requiredGrams / bought, 1);
};
