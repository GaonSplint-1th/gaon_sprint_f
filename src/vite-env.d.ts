/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  /** 이미지 호스트. 비우면 VITE_SERVER_URL 을 쓴다 (CDN 을 따로 붙일 때만 지정). */
  readonly VITE_IMAGE_BASE_URL: string;
  readonly VITE_USE_MOCK_RECIPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
