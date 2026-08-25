import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Close } from '@/components/icons';
import type { Ingredient } from '@/types/recipe.interface';
import * as s from './style.css';

interface IngredientPopupProps {
  recipeName: string;
  ingredients: Ingredient[];
  onClose: () => void;
}

const IngredientPopup = ({
  recipeName,
  ingredients,
  onClose,
}: IngredientPopupProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.popup}
        role="dialog"
        aria-modal="true"
        aria-label={`${recipeName} 재료`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={s.header}>
          <p className={s.title}>{recipeName}</p>
          <button
            type="button"
            className={s.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            <Close size={24} />
          </button>
        </div>

        <div className={s.body}>
          <ul className={s.list}>
            {ingredients.map((ingredient, index) => (
              <li key={`${index}-${ingredient.name}`} className={s.row}>
                <span className={s.ingredientName}>{ingredient.name}</span>
                <span className={s.ingredientAmount}>{ingredient.amount}</span>
              </li>
            ))}
          </ul>

          <div className={s.footer}>
            <button type="button" className={s.closeCta} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default IngredientPopup;
