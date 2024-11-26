export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  companyName?: string;
  phone?: string;
  __v?: number;
}
