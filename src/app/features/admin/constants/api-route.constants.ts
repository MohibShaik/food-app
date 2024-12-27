import { environment } from 'src/environments/environment';

const api = 'api';

export const endPoint = {
  // auth API
  login: `${environment?.apiUrl}/${api}/auth/signin`,
  signup: `${environment?.apiUrl}/${api}/auth/signup`,
  getAllUsers: `${environment?.apiUrl}/${api}/auth/getAllUsers`,

  // menu API
  saveNewMenuItem: `${environment?.apiUrl}/${api}/menuItem`,
  getMenuCategories: `${environment?.apiUrl}/${api}/menuCategories`,
  getMenu: `${environment?.apiUrl}/${api}/menu`,
  updateMenuItem: (menuItemId: string) =>
    `${environment?.apiUrl}/${api}/${menuItemId}/update`,
  deleteMenuItem: (menuItemId: string) =>
    `${environment?.apiUrl}/${api}/${menuItemId}/delete`,

  //order API
  saveNewOrder: `${environment?.apiUrl}/${api}/order`,
  getOrderById: (orderId: string) =>
    `${environment?.apiUrl}/${api}/order-info?orderId=${orderId}`,
  updateOrderStatus: `${environment?.apiUrl}/${api}/order/updateOrderStatus`,
  getOrderByUserId: (userId: string) =>
    `${environment?.apiUrl}/${api}/orders?userId=${userId}`,
  getAllOrders: (pageIndex: number, pageSize: number) => `${environment?.apiUrl}/${api}/orders?pageIndex=${pageIndex}&pageSize=${pageSize}`,

  // getUserInfoById: (userId: string) => `${api}/users/${userId}`,
  // registerVendor: `${api}/vendor/new`,
  // verifyOTP: `${api}/auth/verify-otp`,
};
