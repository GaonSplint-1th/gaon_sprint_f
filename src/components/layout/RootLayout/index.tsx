import { Outlet } from 'react-router-dom';
import * as s from './style.css';

const RootLayout = () => {
  return (
    <div className={s.wrapper}>
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
