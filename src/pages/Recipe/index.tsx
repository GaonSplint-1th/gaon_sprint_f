import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { queryKeys } from '@/constants/queryKeys';
import { getRecipeById } from '@/services/recipe';
import RecipeAppBar from './components/RecipeAppBar';
import RecipeCard from './components/RecipeCard';
import CookingStepList from './components/CookingStepList';
import RecipeSkeleton from './components/RecipeSkeleton';
import * as s from './style.css';

const RecipePage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();

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
        <RecipeAppBar title="레시피" onBack={() => navigate(-1)} />
        <div className={s.card} role="status" aria-label="레시피를 불러오는 중입니다">
          <RecipeSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className={s.container}>
        <RecipeAppBar title="레시피" onBack={() => navigate(-1)} />
        <div className={s.card}>레시피를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <RecipeAppBar title="레시피" onBack={() => navigate(-1)} />

      <div className={s.card}>
        <RecipeCard
          name={recipe.name}
          imageUrl={recipe.imageUrl}
          ingredients={recipe.ingredients}
        />
        <CookingStepList steps={recipe.steps} />
      </div>
    </div>
  );
};

export default RecipePage;
