export interface IUser {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
