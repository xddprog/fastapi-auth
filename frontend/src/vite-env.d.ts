/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_API_URL: string;
    // Добавьте здесь другие переменные
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  