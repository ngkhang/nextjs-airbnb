import en_root from '../locales/en/root.json';
import en_common from '../locales/en/common.json';
import en_error from '../locales/en/errorPage.json';
import en_notfound from '../locales/en/notFound.json';
import en_auth from '../locales/en/authPage.json';
import en_home from '../locales/en/homePage.json';
import en_user from '../locales/en/usersPage.json';
import en_admin from '../locales/en/adminPage.json';

const SUPPORTED_LOCALES = ['en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

interface StaticContent {
  rootContent: typeof en_root;
  commonContent: typeof en_common;
  errorContent: typeof en_error;
  notFoundContent: typeof en_notfound;
  authContent: typeof en_auth;
  homeContent: typeof en_home;
  userContent: typeof en_user;
  adminContent: typeof en_admin;
}

const staticContent: Record<SupportedLocale, StaticContent> = {
  en: {
    rootContent: en_root,
    commonContent: en_common,
    errorContent: en_error,
    notFoundContent: en_notfound,
    authContent: en_auth,
    homeContent: en_home,
    userContent: en_user,
    adminContent: en_admin,
  },
};

// NOTE: Default english
export const defaultContent = staticContent.en;
