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
    RESERVATION_HISTORY: '/users/show/reservation_history',
    ACCOUNT_SETTINGS: '/users/account-settings',
    UPDATE_PROFILE: '/users/account-settings/update-profile',
    CHANGE_PASSWORD: '/users/account-settings/change-password',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/management/users',
    ROOMS: '/admin/management/rooms',
    LOCATIONS: '/admin/management/locations',
  },
  ROOM: {
    DETAIL: (roomId: string | number) => `/rooms/${roomId}`,
    LOCATION: (locationId: string | number) => `/rooms/location?locationId=${locationId}`,
  },
  NOT_FOUND: '/not-found',
} as const;

export type RoutesUser = keyof typeof ROUTES.USER;

export default ROUTES;
