/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ORIGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
