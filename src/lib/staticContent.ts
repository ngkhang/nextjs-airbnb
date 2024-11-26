import en_root from '../locales/en/root.json';
import en_common from '../locales/en/common.json';
import en_error from '../locales/en/errorPage.json';
import en_notfound from '../locales/en/notFound.json';
import en_home from '../locales/en/homepage.json';

const SUPPORTED_LOCALES = ['en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

interface StaticContent {
  rootContent: typeof en_root;
  commonContent: typeof en_common;
  errorContent: typeof en_error;
  notFoundContent: typeof en_notfound;
  homeContent: typeof en_home;
}

const staticContent: Record<SupportedLocale, StaticContent> = {
  en: {
    rootContent: en_root,
    commonContent: en_common,
    errorContent: en_error,
    notFoundContent: en_notfound,
    homeContent: en_home,
  },
};

// NOTE: Default english
export const defaultContent = staticContent.en;
