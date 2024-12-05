/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_TOKEN_CYBERSOFT: string;
      NEXT_PUBLIC_BASE_URL_API: string;
    }
  }
}

export {};
