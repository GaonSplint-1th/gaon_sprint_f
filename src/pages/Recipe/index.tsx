import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { queryKeys } from '@/constants/queryKeys';
import { getRecipeById } from '@/services/recipe';
import RecipeAppBar from './components/RecipeAppBar';
import RecipeCard from './components/RecipeCard';
import CookingStepList from './components/CookingStepList';
import RecipeSkeleton from './components/RecipeSkeleton';
import OnboardingGuide from '@/components/common/OnboardingGuide';
import { useFirstVisitGuide } from '@/hooks/useFirstVisitGuide';
import { useGoBack } from '@/hooks/useGoBack';
import * as s from './style.css';

const RecipePage = () => {
  const { id = '' } = useParams();
  const goBack = useGoBack();
  const ingredientButtonRef = useRef<HTMLButtonElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  // 처음 들어온 사용자에게 한 번 자동으로 안내를 띄운다.
  const guide = useFirstVisitGuide('recipe');

  const {
    data: recipe,
    isError,
    isLoading,
  } = useQuery({
    queryKey: queryKeys.recipe.detail(id),
    queryFn: () => getRecipeById(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className={s.container}>
        <RecipeAppBar title="레시피" onBack={goBack} />
        <div
          className={s.card}
          role="status"
          aria-label="레시피를 불러오는 중입니다"
        >
          <RecipeSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className={s.container}>
        <RecipeAppBar title="레시피" onBack={goBack} />
        <div className={s.card}>레시피를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <RecipeAppBar title="레시피" onBack={goBack} onInfo={guide.reopen} />

      <div className={s.card}>
        <RecipeCard
          name={recipe.name}
          imageUrl={recipe.imageUrl}
          ingredients={recipe.ingredients}
          ingredientButtonRef={ingredientButtonRef}
        />
        <div ref={stepsRef}>
          <CookingStepList steps={recipe.steps} />
        </div>
      </div>

      {guide.open && (
        <OnboardingGuide
          label="레시피 안내"
          onClose={guide.close}
          steps={[
            {
              target: ingredientButtonRef,
              title: '재료보기',
              body: '터치하여 해당 레시피의 재료를 볼 수 있습니다.',
              filled: true,
            },
            {
              target: stepsRef,
              title: '상세 레시피 보기',
              body: '아래로 스크롤하여 레시피를 볼 수 있습니다.',
            },
          ]}
        />
      )}
    </div>
  );
};

export default RecipePage;
