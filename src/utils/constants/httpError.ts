import ROUTES from './routes';

export const HTTP_CODE_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTP_ERROR_MESSAGES = {
  [HTTP_CODE_ERROR.BAD_REQUEST]: 'Bad Request',
  [HTTP_CODE_ERROR.UNAUTHORIZED]: 'Unauthorized access - perhaps the user is not logged in or token expired.',
  [HTTP_CODE_ERROR.FORBIDDEN]: "Forbidden - you don't have permission to access this resource.",
  [HTTP_CODE_ERROR.NOT_FOUND]: 'Resource not found.',
  [HTTP_CODE_ERROR.INTERNAL_SERVER_ERROR]: 'Internal server error.',
} as const;

export const ERROR_ROUTES = {
  [HTTP_CODE_ERROR.BAD_REQUEST]: ROUTES.NOT_FOUND,
  [HTTP_CODE_ERROR.UNAUTHORIZED]: ROUTES.AUTH.LOGIN,
  [HTTP_CODE_ERROR.FORBIDDEN]: ROUTES.AUTH.LOGIN,
  [HTTP_CODE_ERROR.NOT_FOUND]: ROUTES.NOT_FOUND,
  [HTTP_CODE_ERROR.INTERNAL_SERVER_ERROR]: ROUTES.NOT_FOUND,
} as const;

export type HttpCodeError = (typeof HTTP_CODE_ERROR)[keyof typeof HTTP_CODE_ERROR];
