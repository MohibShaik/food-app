import { IMenuItem } from '../../admin/models/menuItem';
import { User } from '../../auth/models/user.model';

export interface order {
  _id: string;
  requester: User;
  orderTotal: number;
  status: string;
  deliveryType: string;
  deliveryTime: string;
  phoneNumber: string;
  requestedItems: IMenuItem[];
  requesterLocation: string;
  cancellationTime: string;
  paymentStatus: boolean;
  createdAt: string;
  __v?: number;
}
