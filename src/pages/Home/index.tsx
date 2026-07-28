import * as s from './style.css';

const HomePage = () => {
  return (
    <div className={s.container}>
      <div>
        <h1 className={s.title}>메인페이지입니다.</h1>
        <p className={s.desc}>쿠팡 관련 코드 확인은 식재료 구매 페이지로 들어가시면 됩니다.</p>
      </div>
    </div>
  );
};

export default HomePage;
