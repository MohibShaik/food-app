import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AdminState, AdminStore } from './admin.store';

@Injectable({
  providedIn: 'root',
})
export class AdminQuery extends Query<AdminState> {
  constructor(store: AdminStore) {
    super(store);
  }

  menuCategories$ = this.select((u) => u.menuCategories);
  cartItems$ = this.select((u) => u.cartItems);
  menu$ = this.select((u) => u.menu);
  deliveryTypes$ = this.select((u) => u.deliveryTypes);
  currentOrder$ = this.select((u) => u.currentOrder);
  orderStatusFilters$ = this.select((u) => u.orderStatusFilters);
  ordersList$ = this.select((u) => u.ordersList);
  navLinks$ = this.select((u) => u.navLinks);
  usersList$ = this.select((u) => u.usersList);

  get orderStatusFilters() {
    return this.getValue().orderStatusFilters;
  }

  get menuCategories() {
    return this.getValue().menuCategories;
  }

  get menu() {
    return this.getValue().menu;
  }
  get cartItems() {
    return this.getValue().cartItems;
  }
}
