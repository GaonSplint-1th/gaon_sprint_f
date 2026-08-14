import * as s from './style.css';

interface RecipeCardProps {
  name: string;
  imageUrl?: string;
}

const RecipeCard = ({ name, imageUrl }: RecipeCardProps) => {
  return (
    <div className={s.container}>
      <div className={s.imageArea}>
        {imageUrl ? (
          <img className={s.image} src={imageUrl} alt={name} />
        ) : (
          <p className={s.imagePlaceholderText}>메뉴 이미지 영역</p>
        )}
      </div>

      <div className={s.header}>
        <p className={s.name}>{name}</p>
        <button type="button" className={s.ingredientButton}>
          재료보기
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
