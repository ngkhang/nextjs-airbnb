import httpClient from '@/lib/axios.config';
import { ResponseBase } from '@/types/common.type';
import { User } from '@/types/user.type';
import API from '@/utils/constants/api';

const USER_API = API.USER;

const userService = {
  getAllUsers: async (): Promise<ResponseBase<User[]>> => {
    try {
      const { data } = await httpClient.get<ResponseBase<User[]>>(USER_API.GET_ALL);
      return data;
    } catch (error) {
      console.log('🚀 ~ getAllUsers: ~ error:', error);
      throw error;
    }
  },

  getUserById: async (userId: number): Promise<ResponseBase<User>> => {
    try {
      const { data } = await httpClient.get<ResponseBase<User>>(USER_API.GET_USER_BY_ID(userId));
      return data;
    } catch (error) {
      console.log('🚀 ~ getUserById: ~ error:', error);
      throw error;
    }
  },
};
export default userService;
