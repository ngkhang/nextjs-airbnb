/**
 * Application route definitions
 */
const ROUTES = {
  HOME: {
    ROOT: '/',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  USER: {
    SHOW: '/users/show',
    PROFILE: '/users/personal-info',
    EARNINGS: '/users/transaction_history',
    UPDATE_INFO: '/users/account-settings/personal-info',
    SECURITY: '/users/account-settings/security',
  },
  NOT_FOUND: '/not-found',
} as const;

export type RoutesUser = keyof typeof ROUTES.USER;

export default ROUTES;
