import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuItem } from 'src/app/features/admin/models/menuItem';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { AdminStore } from 'src/app/features/admin/state/admin.store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartItems!: IMenuItem[];
  totalCartPrice: any;
  @Output() cartPrice = new EventEmitter<number>();

  constructor(public query: AdminQuery, public store: AdminStore) {}

  ngOnInit(): void {
    this.cartItems = [...this.query.getValue().cartItems!];
    this.calcTotal();
  }

  public increment(item: any) {
    const myEntityList = this.store.getValue().menu!;
    const clickedEntityId = item._id;
    const clickedEntityIndex = myEntityList.findIndex(
      (entity: any) => entity._id === clickedEntityId
    );
    if (clickedEntityIndex !== -1) {
      const clickedEntity = myEntityList[clickedEntityIndex];
      const updatedEntity = {
        ...clickedEntity,
        quantity: clickedEntity.quantity + 1,
      };
      const updatedEntityList = [...myEntityList];
      updatedEntityList[clickedEntityIndex] = updatedEntity;
      this.store.update({ menu: updatedEntityList });
      const cartItemIndex = this.cartItems.findIndex(
        (x: any) => x._id === item._id
      );
      this.cartItems[cartItemIndex] = updatedEntityList[clickedEntityIndex];
      this.updateCartItems(this.cartItems);
      this.calcTotal();
    }
  }

  public decrement(item: any) {
    const myEntityList = this.store.getValue().menu!;
    const clickedEntityId = item._id;
    const clickedEntityIndex = myEntityList.findIndex(
      (entity: any) => entity._id === clickedEntityId
    );
    if (clickedEntityIndex !== -1) {
      const clickedEntity = myEntityList[clickedEntityIndex];
      const updatedEntity = {
        ...clickedEntity,
        quantity: clickedEntity.quantity - 1,
      };
      const updatedEntityList = [...myEntityList];

      updatedEntityList[clickedEntityIndex] = updatedEntity;
      this.store.update({ menu: updatedEntityList });

      const cartItemIndex = this.cartItems.findIndex(
        (x: any) => x._id === item._id
      );

      this.cartItems[cartItemIndex] = updatedEntityList[clickedEntityIndex];

      if (this.cartItems[cartItemIndex].quantity == 0) {
        this.cartItems.splice(
          this.cartItems.findIndex(function (i) {
            return i._id === item._id;
          }),
          1
        );
      }
      this.updateCartItems(this.cartItems);
      this.calcTotal();
    }
  }

  private updateCartItems(cartItems: IMenuItem[]) {
    this.store.update({ cartItems: cartItems });
  }

  public calcTotal() {
    if (this.cartItems.length) {
      this.totalCartPrice = this.cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, next) => prev + next);
    }
    this.cartPrice.emit(this.totalCartPrice);
    return this.totalCartPrice;
  }
}
