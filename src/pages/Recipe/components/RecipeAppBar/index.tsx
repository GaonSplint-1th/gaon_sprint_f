import AppBar from '@/components/layout/AppBar';
import { BackArrow, InfoOutline } from '@/components/icons';
import * as s from './style.css';

interface RecipeAppBarProps {
  title: string;
  onBack?: () => void;
}

const RecipeAppBar = ({ title, onBack }: RecipeAppBarProps) => {
  return (
    <AppBar>
      <button type="button" className={s.backButton} onClick={onBack} aria-label="뒤로가기">
        <BackArrow size={19} />
      </button>
      <p className={s.title}>{title}</p>
      <button type="button" className={s.infoButton} aria-label="안내">
        <InfoOutline size={24} />
      </button>
    </AppBar>
  );
};

export default RecipeAppBar;
