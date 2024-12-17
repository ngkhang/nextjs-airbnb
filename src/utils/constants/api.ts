const API = {
  AUTH: {
    LOGIN: '/auth/signin',
    REGISTER: '/auth/signup',
  },
  ROOMS: {
    GET_ALL: '/phong-thue',
    GET_ROOM_BY_ID: (roomId: number) => `/phong-thue/${roomId}`,
    GET_ROOMS_BY_LOCATION_ID: (locationId: number) => `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`,
    GET_ROOMS_PAGINATION: (pageIndex: number, pageSize: number) =>
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    ADD: '/phong-thue',
  },
  LOCATIONS: {
    GET_ALL: '/vi-tri',
    GET_LOCATION_BY_ID: (locationId: number) => `/vi-tri/${locationId}`,
  },
} as const;

export default API;
