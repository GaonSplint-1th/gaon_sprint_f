import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants';
import * as s from './style.css';

const NAV_ITEMS = [{ to: ROUTES.HOME, label: '홈', end: true }];

const RootLayout = () => {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <NavLink to={ROUTES.HOME} className={s.logo}></NavLink>
        <nav className={s.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${s.navLink} ${s.navLinkActive}` : s.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
