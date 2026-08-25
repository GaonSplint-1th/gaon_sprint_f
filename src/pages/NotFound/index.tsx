import { useNavigate } from 'react-router-dom';
import { Screen } from '@/components/layout';
import { Button } from '@/components/common';
import { ROUTES } from '@/constants';
import * as s from './style.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Screen>
      <div className={s.container}>
        <span className={s.code}>404</span>
        <p className={s.message}>페이지를 찾을 수 없습니다.</p>
        <Button size="half" onClick={() => navigate(ROUTES.HOME)}>
          홈으로 돌아가기
        </Button>
      </div>
    </Screen>
  );
};

export default NotFoundPage;
