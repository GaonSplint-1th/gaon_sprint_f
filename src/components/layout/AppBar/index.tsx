import type { ReactNode } from 'react';
import * as s from './style.css';

interface AppBarProps {
  children: ReactNode;
}

const AppBar = ({ children }: AppBarProps) => {
  return <div className={s.container}>{children}</div>;
};

export default AppBar;
