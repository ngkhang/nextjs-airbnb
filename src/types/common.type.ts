import { UserRole } from './user.type';

/**
 * Response base
 */
export interface ResponseBase<T> {
  statusCode: number;
  dateTime: string;
  content: T;
}

/**
 * Response Error
 */
export interface ErrorResponse extends ResponseBase<string> {
  message: string;
}

/**
 * Decode token
 */
export interface DecodeToken {
  id: string;
  email: string;
  exp: number;
  nbf: number;
  role: UserRole;
}
