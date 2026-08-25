import { Outlet } from 'react-router-dom';

/**
 * 라우트 공통 래퍼.
 * 화면의 폭·여백·배경은 Screen 컴포넌트가 잡으므로 여기서는 감싸지 않는다.
 * 하단 탭바처럼 모든 화면에 공통으로 얹을 요소가 생기면 여기에 둔다.
 */
const RootLayout = () => <Outlet />;

export default RootLayout;
