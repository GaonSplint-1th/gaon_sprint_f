import { NoteOutline } from '@/components/icons';
import { toImageUrl } from '@/utils/image';
import type { CookingStep } from '@/types';
import * as s from './style.css';

interface CookingStepItemProps {
  step: CookingStep;
}

const CookingStepItem = ({ step }: CookingStepItemProps) => {
  // DB 는 상대경로로 주므로 이미지 호스트를 붙여 실제로 받아올 주소로 만든다.
  const url = toImageUrl(step.imageUrl);

  return (
    <li className={s.container}>
      <span className={s.description}>{step.description}</span>

      <div className={s.photo}>
        {url ? (
          <img className={s.photoImage} src={url} alt="" />
        ) : (
          <NoteOutline size={24} />
        )}
      </div>
    </li>
  );
};

export default CookingStepItem;
