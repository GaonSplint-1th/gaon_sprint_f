import * as s from './style.css';

const HomePage = () => {
  return (
    <div className={s.container}>
      <div>
        <h1 className={s.title}>메인페이지입니다.</h1>
        <p className={s.desc}>환영합니다.</p>
      </div>
    </div>
  );
};

export default HomePage;
