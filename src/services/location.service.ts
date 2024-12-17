import httpClient from '@/lib/axios.config';
import { ErrorResponse, ResponseBase } from '@/types/common.type';
import LocationType from '@/types/location';
import API from '@/utils/constants/api';

const LOCATION_API = API.LOCATIONS;

const locationService = {
  getAllLocation: async (): Promise<ResponseBase<LocationType[]> | ErrorResponse> => {
    try {
      const { data } = await httpClient.get<ResponseBase<LocationType[]>>(LOCATION_API.GET_ALL);

      return data;
    } catch (error) {
      console.log('🚀 ~ getAllLocation: ~ error:', error);
      throw error;
    }
  },
  getLocationById: async (locationId: number): Promise<ResponseBase<LocationType> | ErrorResponse> => {
    try {
      const { data } = await httpClient.get<ResponseBase<LocationType>>(LOCATION_API.GET_LOCATION_BY_ID(locationId));

      return data;
    } catch (error) {
      console.log('🚀 ~ getLocationById: ~ error:', error);
      throw error;
    }
  },
};

export default locationService;
