import { Skeleton } from '@/components/common';
import * as s from './style.css';

const PLACEHOLDER_STEP_COUNT = 2;

/** RecipeCard + CookingStepList 와 같은 자리·같은 크기를 차지하는 로딩 상태. */
const RecipeSkeleton = () => (
  <>
    <Skeleton variant="image" width="100%" height={185} />

    <div className={s.header}>
      <Skeleton width={112} height={24} />
      <Skeleton width={64} height={24} />
    </div>

    <Skeleton width={88} height={24} />

    <ol className={s.list}>
      {Array.from({ length: PLACEHOLDER_STEP_COUNT }, (_, index) => (
        <li key={index} className={s.item}>
          <div className={s.textGroup}>
            <Skeleton width="100%" height={16} />
            <Skeleton width="60%" height={16} />
          </div>
          <Skeleton variant="image" width={102} height={102} />
        </li>
      ))}
    </ol>
  </>
);

export default RecipeSkeleton;
