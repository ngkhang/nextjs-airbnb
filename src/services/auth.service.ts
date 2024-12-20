import httpClient from '@/lib/axios.config';
import { KEYS } from '@/utils/constants/env';
import { LoginResponse, LogInType, RegisterResponse, RegisterType } from '@/types/auth.type';
import API from '@/utils/constants/api';
import { createSession, deleteSession } from '@/lib/session';

// NOTE: Write description auth actions
const authService = {
  login: async (credentials: LogInType): Promise<LoginResponse> => {
    try {
      const { data } = await httpClient.post<LoginResponse>(API.AUTH.LOGIN, credentials);
      const token = data.content.token;
      if (token) await createSession(KEYS.SESSION, token);

      return data;
    } catch (error) {
      console.log('🚀 ~ login: ~ error:', error);
      throw error;
    }
  },

  register: async (credentials: RegisterType): Promise<RegisterResponse> => {
    try {
      const { data } = await httpClient.post<RegisterResponse>(API.AUTH.REGISTER, credentials);
      return data;
    } catch (error) {
      console.log('🚀 ~ register: ~ error:', error);
      throw error;
    }
  },

  logout: async () => {
    await deleteSession(KEYS.SESSION);
  },
};

export default authService;
