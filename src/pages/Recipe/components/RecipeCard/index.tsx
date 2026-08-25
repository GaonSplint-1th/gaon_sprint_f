import { useState } from 'react';
import { HideImageIcon } from '@/components/icons';
import { Button, Modal } from '@/components/common';
import type { Ingredient } from '@/types/recipe.interface';
import * as s from './style.css';

interface RecipeCardProps {
  name: string;
  imageUrl?: string;
  ingredients: Ingredient[];
}

const RecipeCard = ({ name, imageUrl, ingredients }: RecipeCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageFailed, setIsImageFailed] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState(imageUrl);

  // imageUrl 이 바뀌면 새 이미지에 다시 로드 기회를 준다 (effect 없이 렌더 중 조정).
  if (imageUrl !== loadedImageUrl) {
    setLoadedImageUrl(imageUrl);
    setIsImageFailed(false);
  }

  const showImage = Boolean(imageUrl) && !isImageFailed;

  return (
    <div className={s.container}>
      <div className={s.imageArea}>
        {showImage ? (
          <img
            className={s.image}
            src={imageUrl}
            alt={name}
            onError={() => setIsImageFailed(true)}
          />
        ) : (
          <>
            <HideImageIcon />
            <p className={s.imageEmptyText}>
              {imageUrl
                ? '이미지를 불러오지 못했습니다'
                : '등록된 이미지가 없습니다'}
            </p>
          </>
        )}
      </div>

      <div className={s.header}>
        <p className={s.name}>{name}</p>
        <button
          type="button"
          className={s.ingredientButton}
          onClick={() => setIsPopupOpen(true)}
        >
          재료보기
        </button>
      </div>

      {isPopupOpen && (
        <Modal
          title={name}
          onClose={() => setIsPopupOpen(false)}
          footer={
            <Button size="half" onClick={() => setIsPopupOpen(false)}>
              닫기
            </Button>
          }
        >
          <ul className={s.ingredientList}>
            {ingredients.map((ingredient, index) => (
              <li
                key={`${index}-${ingredient.name}`}
                className={s.ingredientRow}
              >
                <span className={s.ingredientName}>{ingredient.name}</span>
                <span className={s.ingredientAmount}>{ingredient.amount}</span>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default RecipeCard;
