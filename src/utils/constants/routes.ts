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
    DASHBOARD: '/users/show/',
    PROFILE: '/users/show/profile-info',
    EARNINGS: '/users/show/transaction_history',
    ACCOUNT_SETTINGS: '/users/account-settings',
    UPDATE_PROFILE: '/users/account-settings/update-profile',
    CHANGE_PASSWORD: '/users/account-settings/change-password',
  },
  NOT_FOUND: '/not-found',
} as const;

export type RoutesUser = keyof typeof ROUTES.USER;

export default ROUTES;
