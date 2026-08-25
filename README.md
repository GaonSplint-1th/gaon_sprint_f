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
│  ├─ common/     #   Button, MealCard, Modal, Skeleton ... (공용 UI)
│  ├─ layout/     #   Screen, AppBar, RootLayout
│  └─ icons/      #   SVG 아이콘 (IconProps 공통 규격)
├─ hooks/         # 공용 훅
├─ pages/         # 라우트 단위 페이지 (index.tsx + style.css.ts)
├─ router/        # createBrowserRouter 설정
└─ styles/        # theme / font / flex / spacing / radius / layout / screen / global
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

export const title = style([font.titleSmall, { color: theme.textPrimary }]);
```

### 디자인 토큰 (`@/styles`)

전역 토큰을 조합해서 사용합니다. **색상·폰트·간격·모서리는 직접 값을 쓰지 말고 아래 토큰을 쓰세요.**
토큰 값이 디자인과 안 맞으면 화면에서 덮어쓰지 말고 `src/styles/` 에서 토큰 자체를 고칩니다.

| 토큰       | 용도              | 예시                                                    |
| ---------- | ----------------- | ------------------------------------------------------- |
| `theme`    | 색상              | `theme.primary`, `theme.textPrimary`, `theme.border`    |
| `font`     | 폰트 프리셋       | `font.titleMedium`, `font.bodyLarge`, `font.label`      |
| `flex`     | flex 레이아웃     | `flex.CENTER`, `flex.BETWEEN`, `flex.COLUMN_FLEX`       |
| `spacing`  | 간격 (4/8/16/24/32) | `spacing.sm`, `spacing.md`, `spacing.lg`              |
| `radius`   | 모서리 반경       | `radius.sm`(8), `radius.lg`(16), `radius.full`          |
| `layout`   | 프레임·컴포넌트 크기 | `layout.contentWidth`(361), `layout.size.button`(48) |
| `screen`   | 반응형 breakpoint | `screen.phone`, `screen.tablet`                         |

#### 타이포그래피 스케일

393 x 852 모바일 프레임 기준으로 디자이너 컴포넌트에서 실측한 값입니다.

| 토큰 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `titleLarge` | 24/32 600 | 모달 제목 |
| `titleMedium` | 20/28 600 | 앱바 제목, 날짜 바 |
| `titleSmall` | 18/24 600 | 카드·섹션 제목 |
| `bodyLarge` / `bodyStrong` | 16/24 400 / 600 | 본문 |
| `bodySmall` | 14/20 400 | 보조 본문 |
| `label` / `labelSmall` | 18/24 600 / 14/20 600 | 버튼, 인라인 링크 |
| `caption` / `captionStrong` | 12/16 500 / 600 | 캡션·도움말 |

### 공용 컴포넌트

화면마다 앱바·버튼·카드를 새로 만들면 화면끼리 크기가 어긋납니다.
아래 컴포넌트로 조립하고, 없으면 `components/common` 에 새로 추가하세요.

| 컴포넌트 | 크기 (디자인 기준) | 설명 |
| --- | --- | --- |
| `Screen` | 393 프레임 / 콘텐츠 361 | **모든 화면의 셸.** 좌우 마진·배경·하단 고정 CTA 담당 |
| `AppBar` | 361 x 44 | 뒤로가기 / 제목 / 우측 액션 |
| `Button` | 361 x 48 · 180 x 48 | `size="full" \| "half"`, 비활성 상태 포함 |
| `DateNavigator` | 361 x 60 | 날짜 좌우 이동 (`useDateNavigation` 과 함께) |
| `MealCard` | 361 x 116 (썸네일 178 x 100) | 식사 카드 (+ `MealCardSkeleton`) |
| `RecommendCard` | 361 x 196 | 식단 추천 카드 (+ `RecommendCardSkeleton`) |
| `SearchInput` | 361 x 48 | 검색 + 자동완성 (combobox 접근성 포함) |
| `Modal` | 361 / 헤더 64 | 오버레이·ESC·포커스 트랩 처리 |
| `Skeleton` | - | `variant="text" \| "image" \| "circle"` |
| `Chip` | - | 선택 항목 칩 |

```tsx
import { AppBar, Screen } from '@/components/layout';
import { Button, MealCard } from '@/components/common';

const SomePage = () => (
  <Screen bottomCta={<Button onClick={submit}>등록하기</Button>}>
    <AppBar title="화면 제목" onBack={() => navigate(-1)} />
    <MealCard time="아침" name="계란찜" detail="약 5,800원" />
  </Screen>
);
```

> 스켈레톤은 **실제 콘텐츠와 같은 크기·같은 자리**로 만듭니다.
> 로딩이 끝났을 때 레이아웃이 흔들리면 잘못 만든 것입니다.

### 여러 스타일 조합 (배열 문법)

`style([...])`에 토큰과 커스텀 스타일을 배열로 넘겨 합칠 수 있습니다.

```ts
import { style } from '@vanilla-extract/css';
import { flex, font, layout, radius, spacing, theme } from '@/styles';

export const button = style([
  flex.CENTER, // flex 레이아웃 토큰
  font.label, // 폰트 토큰
  {
    height: layout.size.button,
    padding: `0 ${spacing.lg}`,
    borderRadius: radius.sm,
    backgroundColor: theme.primary,
    color: theme.onPrimary,
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

## 백엔드 연동 (API)

`gaon-platform` 백엔드(Spring Boot)와 붙는 부분입니다. 서버는 [gaon-platform](https://github.com/GaonSplint-1th/gaon-platform)의 `make setup` 으로 띄웁니다.

### 서버 주소

`.env` 의 `VITE_SERVER_URL` 이 axios `baseURL` 입니다. **origin 만** 적고 `/api/v1` 은 코드가 붙입니다.

백엔드는 같은 저장소 옆의 [`gaon-platform`](../gaon-platform) 에서 도커로 띄웁니다.

```bash
cd ../gaon-platform && make up-all
```

| 작업 방식 | `VITE_SERVER_URL` | 비고 |
| --- | --- | --- |
| **dev 서버(`pnpm dev`, :5173)에서 작업** | `http://localhost:8080` | 백엔드 컨테이너에 직접. `APP_CORS_ALLOWED_ORIGINS` 에 5173 이 들어 있어 CORS 통과 |
| gaon-platform 이 프론트까지 띄울 때 | 빈 값 | 게이트웨이(`:8090`) 동일 오리진 → CORS 없음 |

> 게이트웨이는 **8090**, 백엔드 직접 접근은 **8080** 입니다. 프론트 dev 서버는 **5173** 이어야 CORS 가 열려 있습니다.
> 서버가 살아 있는지는 <http://localhost:8080/api/health> 가 `{"status":"UP"}` 을 주는지로 확인하세요.
> API 문서는 <http://localhost:8090/swagger-ui/index.html>.

### 기기 인증 (자동)

로그인/회원가입 화면이 없습니다. 앱 첫 실행 때 `SessionProvider` 가 기기별 `deviceId` 로 `POST /api/v1/auth/device` 를 호출해 계정을 만들고 토큰을 받습니다.

- `src/libs/session.ts` — `deviceId`·토큰·`userId` 를 localStorage 에 보관
- `src/api/index.ts` — 요청마다 `Authorization: Bearer` 자동 주입, 401 이면 세션을 비우고 재인증 유도
- `src/services/auth` — `useSession()`(세션 부팅), `useUserId()`(현재 userId)

유저 스코프 훅(`useUserIngredients`, `useCurrentMenu` 등)은 `userId` 를 세션에서 알아서 채웁니다. 화면에서는 `userId` 를 신경 쓰지 않고 훅만 호출하면 됩니다.

```tsx
const { data } = useUserIngredients(); // userId 자동
const add = useAddUserIngredient();
add.mutate({ ingredientId: 7 });
```

### 도메인별 서비스

`src/services/` 아래에 명세서 기준으로 구현돼 있습니다.

| 폴더 | 내용 |
| --- | --- |
| `auth` | 기기 인증 / 세션 |
| `ingredient` | 식재료 검색·상세, 보유 식재료 CRUD, 식재료 요청 |
| `menu` | 현재 식단 조회·생성·재생성, 요일/식사 수정·삭제·새로고침 |
| `weeklyMenu` | 템플릿 목록·상세, 내 템플릿, 식단 가격 계산 |
| `favorite` | 즐겨찾기 조회·등록·해제 |
| `shopping` | 장보기 체크리스트 조회·추가·체크·삭제 |
| `dish` | 요리(레시피) 목록·상세 |
| `preference` | 선호 음식 조회·수정 |
| `user` | 유저 단건 조회 |

## 협업 방식 (Git Flow)

> 여러 명이 같은 저장소에서 충돌 없이 개발하기 위한 규칙입니다.
> **Git이 처음이어도 아래 순서만 그대로 따라 하면 됩니다.**

### 브랜치 종류

| 브랜치 | 역할 | 설명 |
| --- | --- | --- |
| `master` | 배포/최종본 | 항상 정상 동작하는 안정 버전. **여기에 직접 push 하지 않는다.** |
| `develop` | 개발 통합 | 기능들이 모이는 브랜치. 모든 작업은 여기서 시작해 여기로 합쳐진다. |
| `feature/*` | 기능 개발 | 개인이 기능 하나를 만드는 브랜치. 작업이 끝나면 `develop`으로 PR. |

```
master  ──●───────────────────●──   (배포 시점만 합침)
           \                 /
develop ────●───●───────●───●─────   (개발 통합)
                 \     /
feature/login    ●───●               (각자 기능 개발)
```

### 브랜치 이름 규칙

`종류/작업내용` 형태로 짓는다. (영어 소문자 + 하이픈)

- `feature/login` — 로그인 기능
- `feature/ingredient-list` — 식재료 목록
- `fix/header-color` — 헤더 색상 버그 수정

### 최초 1회 준비 (develop 브랜치 만들기)

`develop`이 아직 없다면 팀에서 **한 명만** 아래를 실행한다.

```bash
git checkout master
git pull origin master
git checkout -b develop
git push -u origin develop
```

이후 나머지 팀원은 저장소를 클론한 뒤 `develop`을 받아온다.

```bash
git checkout develop
git pull origin develop
```

### 기능 개발 순서 (매번 반복)

**1. 최신 develop을 받는다** — 작업 시작 전 항상 최신 상태로 맞춘다.

```bash
git checkout develop
git pull origin develop
```

**2. 내 작업용 feature 브랜치를 만든다.**

```bash
git checkout -b feature/login
```

**3. 코드를 작성하고 커밋한다** — 의미 있는 단위로 나눠서 커밋한다.

```bash
git add .
git commit -m "feat: 로그인 폼 UI 구현"
```

**4. 원격에 올린다** — 처음 올릴 때는 `-u` 를 붙인다.

```bash
git push -u origin feature/login
```

**5. GitHub에서 Pull Request(PR)를 만든다.**
- GitHub 저장소에 들어가면 "Compare & pull request" 버튼이 뜬다.
- **base**(합쳐질 곳)를 `develop`, **compare**(내 브랜치)를 `feature/login`으로 설정한다.
- PR 템플릿에 맞춰 작업 내용을 작성하고 생성한다.

**6. 팀원이 코드 리뷰를 한다.**
- 리뷰어는 코드를 확인하고 코멘트를 남긴다.
- 수정 요청이 있으면 같은 브랜치에서 다시 커밋 → push 하면 PR에 자동 반영된다.
- **최소 1명 이상 Approve** 후 머지하는 것을 규칙으로 한다.

**7. PR을 develop에 머지한다.**
- GitHub에서 "Merge pull request" 클릭. (머지 후 브랜치 삭제 권장)

**8. 로컬을 정리한다** — 다음 작업을 위해 develop을 다시 최신화한다.

```bash
git checkout develop
git pull origin develop
git branch -d feature/login
```

→ 이후 새 기능은 다시 **1번부터** 반복한다.

### 충돌(conflict)이 났을 때

PR에서 "This branch has conflicts"가 뜨면, 내 브랜치에 최신 develop을 먼저 합친 뒤 충돌을 해결한다.

```bash
git checkout feature/login
git pull origin develop
```

- 충돌난 파일을 열면 `<<<<<<<`, `=======`, `>>>>>>>` 표시가 있다.
- 남길 코드만 남기고 표시들을 지운 뒤 저장한다.
- 해결 후 다시 커밋 & push 한다.

```bash
git add .
git commit -m "fix: develop 병합 충돌 해결"
git push
```

### 커밋 메시지 규칙

`타입: 설명` 형식으로 작성한다.

| 타입 | 사용 시점 |
| --- | --- |
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | 코드 포맷·스타일 (기능 변화 없음) |
| `refactor` | 리팩터링 (기능 변화 없음) |
| `chore` | 설정·빌드·기타 잡일 |
| `docs` | 문서 수정 |

예) `feat: 식재료 목록 페이지 추가`

### 한눈에 보는 요약

```bash
git checkout develop && git pull origin develop   # 1. 최신 develop
git checkout -b feature/기능이름                    # 2. 브랜치 생성
# ... 작업 ...
git add . && git commit -m "feat: 작업 내용"        # 3. 커밋
git push -u origin feature/기능이름                 # 4. 푸시
# 5. GitHub에서 PR 생성 (base: develop) → 6. 리뷰 → 7. 머지
```
