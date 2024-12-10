/* eslint-disable arrow-body-style */
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from './session';
import { ENV, KEYS } from '@/utils/constants/env';
import { ErrorResponse } from '@/types/common.type';
import { HTTP_ERROR_MESSAGES, HTTP_CODE_ERROR } from '@/utils/constants/httpError';

/**
 * Instance Axios
 *
 * @link https://axios-http.com/docs/instance
 */
const httpClient: AxiosInstance = axios.create({
  baseURL: ENV.BASE_URL_API,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json-patch+json',
    [KEYS.TOKEN_CYBERSOFT]: ENV.TOKEN_CYBERSOFT,
  },
});

/**
 * Request interceptor
 *
 * @link https://axios-http.com/docs/interceptors
 */
httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = config.headers.get('token') || (await getSession(KEYS.SESSION))?.value;

    if (token && config.headers) {
      config.headers.set(KEYS.TOKEN, token);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Response interceptor
 *
 * @link https://axios-http.com/docs/interceptors
 */
httpClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // TODO: Check token expired if needed
    let errorResponse: ErrorResponse = {
      statusCode: HTTP_CODE_ERROR.INTERNAL_SERVER_ERROR,
      dateTime: new Date().toISOString(),
      content: 'An unexpected error occurred',
      message: HTTP_ERROR_MESSAGES[HTTP_CODE_ERROR.INTERNAL_SERVER_ERROR],
    };

    if (error.response) {
      if (error.response.data) {
        errorResponse = error.response.data;
      } else {
        errorResponse = {
          ...errorResponse,
          content: 'Unknown error',
          statusCode: error.response.status,
          message: error.message,
        };
      }
    }

    return Promise.reject(errorResponse);
  }
);

export default httpClient;
