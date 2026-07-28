# vacation-project

Vite + React + TypeScript 기반 프로젝트.

## 기술 스택

| 구분        | 사용 기술                                    |
| ----------- | -------------------------------------------- |
| 빌드 도구   | [Vite](https://vite.dev/)                    |
| 프레임워크  | React 19 + TypeScript                        |
| 스타일      | [vanilla-extract](https://vanilla-extract.style/) (`*.css.ts`) |
| 서버 상태   | [TanStack Query](https://tanstack.com/query) (React Query v5) |
| HTTP        | [axios](https://axios-http.com/)             |
| 라우팅      | [react-router-dom](https://reactrouter.com/) v7 |
| 포맷터/린터 | Prettier + ESLint                            |
| 패키지 매니저 | pnpm                                       |

## 클론 후 처음 할 일

### 1. pnpm 설치 (없다면)

이 프로젝트는 **pnpm**을 사용합니다.

```bash
npm install -g pnpm
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

`.env.example`을 복사해 `.env`를 만들고 값을 채웁니다.

```bash
cp .env.example .env
```

| 변수              | 설명                                |
| ----------------- | ----------------------------------- |
| `VITE_SERVER_URL` | 백엔드 API 서버 주소 (axios baseURL) |

> `.env`는 `.gitignore`에 등록되어 커밋되지 않습니다.

### 4. 개발 서버 실행

```bash
pnpm dev
```

기본 주소: http://localhost:5173

## 스크립트

```bash
pnpm dev           # 개발 서버 실행
pnpm build         # 타입 체크(tsc) 후 프로덕션 빌드
pnpm preview       # 빌드 결과 미리보기
pnpm lint          # ESLint 검사
pnpm format        # Prettier 포맷 적용
pnpm format:check  # Prettier 포맷 검사 (CI용)
```

## 폴더 구조

```
src/
├─ api/           # axios 인스턴스 + api 헬퍼 (api.get/post ...)
├─ libs/          # queryClient 등 라이브러리 설정
├─ providers/     # 전역 Provider (QueryProvider)
├─ constants/     # 라우트 경로, 쿼리 키 등 상수
├─ types/         # 공통 타입 (*.interface.ts + index 배럴)
├─ services/      # 도메인별 API 로직
│  └─ coupang/    #   coupang.api / .query / .mutation
├─ components/    # 재사용 컴포넌트
│  └─ layout/     #   RootLayout 등 레이아웃
├─ pages/         # 라우트 단위 페이지 (index.tsx + style.css.ts)
├─ router/        # createBrowserRouter 설정
└─ styles/        # theme / font / flex / screen / global
```

### 경로 별칭

`@` 는 `src/` 를 가리킵니다.

```ts
import { theme } from '@/styles';
import { useCoupangSearchQuery } from '@/services/coupang';
```

## 스타일 짜는 법

스타일은 [vanilla-extract](https://vanilla-extract.style/)로 작성합니다. CSS를 `.ts` 파일에서 타입 안전하게 정의하고, 빌드 시 실제 CSS로 추출됩니다.

### 기본 규칙

- 컴포넌트마다 같은 폴더에 **`style.css.ts`** 파일을 만든다.
- `style()`로 클래스를 정의해 `export` 한다.
- 컴포넌트에서는 `import * as s from './style.css'` 로 가져와 `className={s.xxx}` 로 사용한다.

```tsx
// pages/Home/index.tsx
import * as s from './style.css';

const HomePage = () => <h1 className={s.title}>제목</h1>;
```

```ts
// pages/Home/style.css.ts
import { style } from '@vanilla-extract/css';
import { theme, font } from '@/styles';

export const title = style([font.H1, { color: theme.text }]);
```

### 디자인 토큰 (`@/styles`)

전역 토큰을 조합해서 사용합니다. 색상·폰트는 직접 값을 쓰지 말고 아래 토큰을 쓰세요.

| 토큰     | 용도       | 예시                                        |
| -------- | ---------- | ------------------------------------------- |
| `theme`  | 색상       | `theme.primary`, `theme.text`, `theme.border` |
| `font`   | 폰트 프리셋 | `font.H1`~`font.H6`, `font.p1`~`font.p4`, `font.btn1`~ |
| `flex`   | flex 레이아웃 | `flex.CENTER`, `flex.BETWEEN`, `flex.COLUMN_FLEX` |
| `screen` | 반응형 breakpoint | `screen.phone`, `screen.tablet` |

### 여러 스타일 조합 (배열 문법)

`style([...])`에 토큰과 커스텀 스타일을 배열로 넘겨 합칠 수 있습니다.

```ts
import { style } from '@vanilla-extract/css';
import { flex, font, theme } from '@/styles';

export const button = style([
  flex.CENTER, // flex 레이아웃 토큰
  font.btn2, // 폰트 토큰
  {
    height: '48px',
    padding: '0 24px',
    borderRadius: '10px',
    backgroundColor: theme.primary,
    color: theme.white,
  },
]);
```

### 가상 선택자 / 미디어 쿼리

CamelCase 속성명을 쓰고, `:hover` 등은 문자열 키로 작성합니다.

```ts
import { style } from '@vanilla-extract/css';
import { theme, screen } from '@/styles';

export const card = style({
  padding: '20px',
  backgroundColor: theme.white,
  transition: 'box-shadow 0.15s',

  ':hover': {
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  },

  '@media': {
    [`(max-width: ${screen.phone})`]: {
      padding: '12px',
    },
  },
});
```

### 전역 스타일

reset, 폰트, 기본 색상 등 전역 스타일은 [`src/styles/global.css.ts`](src/styles/global.css.ts)에서 `globalStyle`로 관리합니다. `main.tsx`에서 한 번 import 됩니다.

## 새 API(도메인) 추가하는 법

`src/services/<도메인>/` 아래에 3개 파일 패턴으로 작성합니다.

- `<도메인>.api.ts` — axios 요청 함수
- `<도메인>.query.ts` — `useQuery` 훅
- `<도메인>.mutation.ts` — `useMutation` 훅
- `index.ts` — 배럴 export

타입은 `src/types/<도메인>.interface.ts`에 정의하고 `src/types/index.ts`에서 export 합니다.
