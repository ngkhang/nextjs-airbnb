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
