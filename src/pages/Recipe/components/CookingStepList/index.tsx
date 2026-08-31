import type { CookingStep } from '@/types';
import CookingStepItem from '../CookingStepItem';
import * as s from './style.css';

interface CookingStepListProps {
  steps: CookingStep[];
}

const CookingStepList = ({ steps }: CookingStepListProps) => {
  return (
    <div className={s.container}>
      <p className={s.title}>※ 조리순서</p>

      <ol className={s.list}>
        {steps.map((step) => (
          <CookingStepItem key={step.order} step={step} />
        ))}
      </ol>
    </div>
  );
};

export default CookingStepList;
