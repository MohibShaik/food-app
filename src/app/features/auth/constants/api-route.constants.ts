const api = '/api';

export const endPoint = {
  login: `${api}/auth/signin`,
  getUserInfoById: (userId: string) => `${api}/users/${userId}`,
  registerVendor: `${api}/vendor/new`,
  verifyOTP: `${api}/auth/verify-otp`,
};
