import httpClient from '@/lib/axios.config';
import { ResponseBase } from '@/types/common.type';
import RoomType from '@/types/room.type';
import API from '@/utils/constants/api';

const ROOM_API = API.ROOMS;

const roomService = {
  getAllRooms: async (): Promise<ResponseBase<RoomType[]>> => {
    try {
      const { data } = await httpClient.get<ResponseBase<RoomType[]>>(ROOM_API.GET_ALL);

      return data;
    } catch (error) {
      console.log('🚀 ~ getAllRooms: ~ error:', error);
      throw error;
    }
  },

  getRoomById: async (roomId: number): Promise<ResponseBase<RoomType>> => {
    try {
      const { data } = await httpClient.get<ResponseBase<RoomType>>(ROOM_API.GET_ROOM_BY_ID(roomId));

      return data;
    } catch (error) {
      console.log('🚀 ~ getRoomById: ~ error:', error);
      throw error;
    }
  },

  getRoomByLocationId: async (locationId: number): Promise<ResponseBase<RoomType[]>> => {
    try {
      const { data } = await httpClient.get<ResponseBase<RoomType[]>>(ROOM_API.GET_ROOMS_BY_LOCATION_ID(locationId));

      return data;
    } catch (error) {
      console.log('🚀 ~ getRoomByLocationId: ~ error:', error);
      throw error;
    }
  },

  // TODO: Check type
  add: async (room: RoomType): Promise<ResponseBase<string>> => {
    try {
      const { data } = await httpClient.post<ResponseBase<string>>(ROOM_API.ADD, room);
      return data;
    } catch (error) {
      console.log('🚀 ~ add:async ~ error:', error);
      throw error;
    }
  },
};

export default roomService;
