import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IMenuItem } from '../models/menuItem';
import { order } from '../../order-now/models/order.model';

export interface AdminState {
  menu?: any[];
  menuCategories?: any[];
  cartItems?: any[];
  deliveryTypes?: any[];
  currentOrder?: order | any;
  orderStatusFilters?: any[];
  ordersList?: any[];
  navLinks?: any[];
  usersList?: any[];
}

export function createInitialState(): AdminState {
  return {
    cartItems: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'admin' })
export class AdminStore extends Store<AdminState> {
  constructor() {
    super(createInitialState());
  }
}
