export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
