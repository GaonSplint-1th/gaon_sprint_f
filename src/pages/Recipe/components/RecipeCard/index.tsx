import { useCallback, useState, type RefObject } from 'react';
import { HideImage } from '@/components/icons';
import { toImageUrl } from '@/utils/image';
import type { Ingredient } from '@/types/recipe.interface';
import IngredientPopup from '../IngredientPopup';
import * as s from './style.css';

interface RecipeCardProps {
  name: string;
  imageUrl?: string;
  ingredients: Ingredient[];
  /** 온보딩 안내가 짚어 줄 재료보기 버튼. */
  ingredientButtonRef?: RefObject<HTMLButtonElement | null>;
}

const RecipeCard = ({
  name,
  imageUrl,
  ingredients,
  ingredientButtonRef,
}: RecipeCardProps) => {
  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(false);
  const [isImageLoadFailed, setIsImageLoadFailed] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState(imageUrl);

  // imageUrl 이 바뀌면 새 이미지에 다시 로드 기회를 준다 (effect 없이 렌더 중 조정).
  if (imageUrl !== loadedImageUrl) {
    setLoadedImageUrl(imageUrl);
    setIsImageLoadFailed(false);
  }

  // DB 는 상대경로로 주므로 이미지 호스트를 붙여 실제로 받아올 주소로 만든다.
  const url = toImageUrl(imageUrl);
  const showImage = Boolean(url) && !isImageLoadFailed;

  const closeIngredientPopup = useCallback(
    () => setIsIngredientPopupOpen(false),
    [],
  );

  return (
    <div className={s.container}>
      <div className={s.imageArea}>
        {showImage ? (
          <img
            className={s.image}
            src={url as string}
            alt={name}
            onError={() => setIsImageLoadFailed(true)}
          />
        ) : (
          <div className={s.imageEmpty}>
            <HideImage size={24} />
            <p className={s.imageEmptyText}>
              {imageUrl
                ? '이미지를 불러오지 못했습니다'
                : '등록된 이미지가 없습니다'}
            </p>
          </div>
        )}
      </div>

      <div className={s.header}>
        <p className={s.name}>{name}</p>
        <button
          ref={ingredientButtonRef}
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
