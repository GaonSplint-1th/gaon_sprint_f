import * as s from './style.css';

const PLACEHOLDER_STEP_IDS = [1, 2] as const;

const RecipeSkeleton = () => {
  return (
    <>
      <div className={s.imageArea} />

      <div className={s.header}>
        <div className={s.nameBar} />
        <div className={s.buttonBar} />
      </div>

      <div className={s.sectionTitleBar} />

      <ol className={s.list}>
        {PLACEHOLDER_STEP_IDS.map((id) => (
          <li key={id} className={s.item}>
            <div className={s.textGroup}>
              <div className={s.textLine} />
              <div className={s.textLineShort} />
            </div>
            <div className={s.photo} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default RecipeSkeleton;
