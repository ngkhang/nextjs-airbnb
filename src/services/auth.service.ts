import httpClient from '@/lib/axios.config';
import { KEYS } from '@/utils/constants/env';
import { LoginResponse, LogInType } from '@/types/auth.type';
import { ErrorResponse } from '@/types/common.type';
import API from '@/utils/constants/api';
import cookieClient from '@/utils/cookiesClient';

// NOTE: Write description auth actions
const authService = {
  login: async (credentials: LogInType): Promise<LoginResponse | ErrorResponse> => {
    try {
      const { data } = await httpClient.post<LoginResponse>(API.AUTH.LOGIN, credentials);
      const token = data.content.token;
      if (token) cookieClient.set(KEYS.TOKEN, token);
      return data;
    } catch (error) {
      console.log('🚀 ~ login: ~ error:', error);
      throw error;
    }
  },
};

export default authService;
