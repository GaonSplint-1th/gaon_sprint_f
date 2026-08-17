import { NoteOutline } from '@/components/icons';
import type { CookingStep } from '@/types';
import * as s from './style.css';

interface CookingStepItemProps {
  step: CookingStep;
}

const CookingStepItem = ({ step }: CookingStepItemProps) => {
  return (
    <li className={s.container}>
      <span className={s.description}>{step.description}</span>

      <div className={s.photo}>
        {step.imageUrl ? (
          <img className={s.photoImage} src={step.imageUrl} alt="" />
        ) : (
          <NoteOutline size={24} />
        )}
      </div>
    </li>
  );
};

export default CookingStepItem;
