import { useCallback, useEffect, useState } from 'react';
import { HideImage } from '@/components/icons';
import type { Ingredient } from '@/types/recipe.interface';
import IngredientPopup from '../IngredientPopup';
import * as s from './style.css';

interface RecipeCardProps {
  name: string;
  imageUrl?: string;
  ingredients: Ingredient[];
}

const RecipeCard = ({ name, imageUrl, ingredients }: RecipeCardProps) => {
  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(false);
  const [isImageLoadFailed, setIsImageLoadFailed] = useState(false);

  useEffect(() => {
    setIsImageLoadFailed(false);
  }, [imageUrl]);

  const showImage = Boolean(imageUrl) && !isImageLoadFailed;

  const closeIngredientPopup = useCallback(() => setIsIngredientPopupOpen(false), []);

  return (
    <div className={s.container}>
      <div className={s.imageArea}>
        {showImage ? (
          <img
            className={s.image}
            src={imageUrl}
            alt={name}
            onError={() => setIsImageLoadFailed(true)}
          />
        ) : (
          <div className={s.imageEmpty}>
            <HideImage size={24} />
            <p className={s.imageEmptyText}>
              {imageUrl ? '이미지를 불러오지 못했습니다' : '등록된 이미지가 없습니다'}
            </p>
          </div>
        )}
      </div>

      <div className={s.header}>
        <p className={s.name}>{name}</p>
        <button
          type="button"
          className={s.ingredientButton}
          onClick={() => setIsIngredientPopupOpen(true)}
        >
          재료보기
        </button>
      </div>

      {isIngredientPopupOpen && (
        <IngredientPopup
          recipeName={name}
          ingredients={ingredients}
          onClose={closeIngredientPopup}
        />
      )}
    </div>
  );
};

export default RecipeCard;
