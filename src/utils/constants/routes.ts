/**
 * Application route definitions
 */
const ROUTES = {
  HOME: {
    ROOT: '/',
  },
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
  },
  NOT_FOUND: '/not-found',
} as const;

export default ROUTES;
