import httpClient from '@/lib/axios.config';
import { Booking } from '@/types/booking.type';
import { ResponseBase } from '@/types/common.type';
import API from '@/utils/constants/api';

const BOOKING_API = API.BOOKING;

const booKingService = {
  getBookingByUserId: async (userId: number): Promise<ResponseBase<Booking[]>> => {
    try {
      const { data } = await httpClient.get<ResponseBase<Booking[]>>(BOOKING_API.GET_BOOKING_BY_USER_ID(userId));

      return data;
    } catch (error) {
      console.log('🚀 ~ getAllUsers: ~ error:', error);
      throw error;
    }
  },
};

export default booKingService;
