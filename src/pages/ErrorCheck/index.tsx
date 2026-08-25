import { useNavigate } from 'react-router-dom';
import { AppBar, Screen } from '@/components/layout';
import { useErrorPopup } from '@/hooks/useErrorPopup';
import type { ErrorPopupType } from '@/types';
import * as s from './style.css';

interface ErrorCheckItem {
  type: ErrorPopupType;
  label: string;
  description: string;
  code?: string | number;
}

const ERROR_CHECK_ITEMS: ErrorCheckItem[] = [
  {
    type: 'API_ERROR',
    label: 'API 에러',
    description: '4xx 등 서버가 응답한 에러 상황',
    code: 400,
  },
  {
    type: 'NETWORK_ERROR',
    label: '네트워크 오류',
    description: '요청이 서버에 도달하지 못하는 상황',
  },
  {
    type: 'SERVER_UNAVAILABLE',
    label: '서버 점검 & 연결 불가',
    description: '503 또는 헬스체크 실패 상황',
    code: 503,
  },
  {
    type: 'UPDATE_REQUIRED',
    label: '업데이트 안내',
    description: '앱 최소 지원 버전 미달 상황',
  },
];

const ErrorCheckPage = () => {
  const navigate = useNavigate();
  const { showError } = useErrorPopup();

  return (
    <Screen>
      <AppBar title="오류 확인" onBack={() => navigate('/')} />

      <p className={s.desc}>
        버튼을 눌러 각 상황에서 뜨는 오류 팝업을 미리 확인할 수 있어요.
      </p>

      <ul className={s.list}>
        {ERROR_CHECK_ITEMS.map((item) => (
          <li key={item.type} className={s.item}>
            <div>
              <p className={s.itemLabel}>{item.label}</p>
              <p className={s.itemDesc}>{item.description}</p>
            </div>
            <button
              type="button"
              className={s.triggerButton}
              onClick={() => showError({ type: item.type, code: item.code })}
            >
              팝업 띄우기
            </button>
          </li>
        ))}
      </ul>
    </Screen>
  );
};

export default ErrorCheckPage;
