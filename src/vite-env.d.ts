/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_USE_MOCK_RECIPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
