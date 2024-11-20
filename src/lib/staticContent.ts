import en_root from '../locales/en/root.json';
import en_common from '../locales/en/common.json';
import en_auth from '../locales/en/auth.json';

const SUPPORTED_LOCALES = ['en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

interface StaticContent {
  rootContent: typeof en_root;
  errorContent: typeof en_common.Error;
  notFoundContent: typeof en_common.NotFound;
  authContent: typeof en_auth;
}

const staticContent: Record<SupportedLocale, StaticContent> = {
  en: {
    rootContent: en_root,
    errorContent: en_common.Error,
    notFoundContent: en_common.NotFound,
    authContent: en_auth,
  },
};

// NOTE: Default english
export const defaultContent = staticContent.en;
