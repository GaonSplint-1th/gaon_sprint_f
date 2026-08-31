import AppBar from '@/components/layout/AppBar';
import { BackArrow, InfoOutline } from '@/components/icons';
import * as s from './style.css';

interface RecipeAppBarProps {
  title: string;
  onBack?: () => void;
  /** 안내 버튼. 없으면 버튼을 숨긴다(동작 없는 버튼을 두지 않는다). */
  onInfo?: () => void;
}

const RecipeAppBar = ({ title, onBack, onInfo }: RecipeAppBarProps) => {
  return (
    <AppBar>
      <button
        type="button"
        className={s.backButton}
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <BackArrow size={19} />
      </button>
      <p className={s.title}>{title}</p>
      {onInfo ? (
        <button
          type="button"
          className={s.infoButton}
          aria-label="레시피 안내 보기"
          onClick={onInfo}
        >
          <InfoOutline size={24} />
        </button>
      ) : (
        <span className={s.infoButton} aria-hidden />
      )}
    </AppBar>
  );
};

export default RecipeAppBar;
