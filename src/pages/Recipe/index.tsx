import { useNavigate, useParams } from 'react-router-dom';
import { AppBar, Screen } from '@/components/layout';
import { toRecipe, useDish } from '@/services/dish';
import RecipeCard from './components/RecipeCard';
import CookingStepList from './components/CookingStepList';
import RecipeSkeleton from './components/RecipeSkeleton';
import * as s from './style.css';

const RecipePage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  // 주소의 :id 는 dishId. 숫자가 아니면 요청하지 않고 "찾을 수 없음" 으로 떨어뜨린다.
  const dishId = Number(id);
  const {
    data: dish,
    isError,
    isLoading,
  } = useDish(Number.isInteger(dishId) && dishId > 0 ? dishId : undefined);

  const recipe = dish && toRecipe(dish);

  return (
    <Screen>
      <AppBar
        title="레시피"
        onBack={() => navigate(-1)}
        onInfo={() => undefined}
      />

      {isLoading && (
        <div
          className={s.card}
          role="status"
          aria-label="레시피를 불러오는 중입니다"
        >
          <RecipeSkeleton />
        </div>
      )}

      {!isLoading && (isError || !recipe) && (
        <div className={s.card}>
          <p className={s.message}>레시피를 찾을 수 없습니다.</p>
        </div>
      )}

      {!isLoading && !isError && recipe && (
        <div className={s.card}>
          <RecipeCard
            name={recipe.name}
            imageUrl={recipe.imageUrl}
            ingredients={recipe.ingredients}
          />
          <CookingStepList steps={recipe.steps} />
        </div>
      )}
    </Screen>
  );
};

export default RecipePage;
