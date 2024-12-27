import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IMenuCategory } from 'src/app/features/admin/models/menuCategory';
import { IMenuItem } from 'src/app/features/admin/models/menuItem';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { AdminStore } from 'src/app/features/admin/state/admin.store';
import { MenuService } from 'src/app/features/admin/state/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public activeTabIndex = 0; // Default to the first tab
  foodMenu!: IMenuItem[];
  private filteredFoodMenuSubject = new BehaviorSubject<IMenuItem[]>([]);
  filteredFoodMenu$ = this.filteredFoodMenuSubject.asObservable();
  menuCategories!: IMenuCategory[];
  showHoverText: boolean = false;
  selectedMenuItem!: IMenuItem;
  public cartItems: any[] = [];
  public totalCartPrice!: number;
  public currentDate = new Date();

  constructor(
    private menuService: MenuService,
    public query: AdminQuery,
    private toastr: ToastrService,
    public store: AdminStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMenuCats();
    this.getMenu();
  }

  private getMenu() {
    this.menuService.getMenu().subscribe((response) => {
      this.foodMenu = response?.response;
      // this.filterMenu();
    });
  }

  private getMenuCats() {
    this.menuService.getMenuCategories().subscribe(
      (response) => {
        this.menuCategories = response?.response;
      },
      (error) => {
        console.error('Error retreiving the menu categories:', error);
      }
    );
  }

  public filterMenu(menuList: any, menuCats: any) {
    const activeCategory = menuCats.filter(
      (item: any, index: number) => index === this.activeTabIndex
    );
    return menuList.filter(
      (menuItem: IMenuItem) =>
        menuItem.menuCategoryId?._id === activeCategory[0]?._id
    );
  }

  public selectTab(index: number): void {
    this.activeTabIndex = index;
  }

  public addItem(menuItem: IMenuItem) {
    const index = this.cartItems.map((item) => item._id).indexOf(menuItem._id);
    if (index == -1) {
      const myEntityList = this.store.getValue().menu!;

      const clickedEntityId = menuItem._id;
      const clickedEntityIndex = myEntityList?.findIndex(
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

        this.cartItems.push(updatedEntityList[clickedEntityIndex]);
        this.updateCartItems(this.cartItems);
      }
    }
  }

  private updateCartItems(cartItems: IMenuItem[]) {
    this.store.update({ cartItems: cartItems });
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
    }
  }

  calcTotal(cartItems: any) {
    if (cartItems.length) {
      this.totalCartPrice = cartItems
        .map((item: IMenuItem) => item.price * item.quantity)
        .reduce((prev: any, next: any) => prev + next);
    }
    return this.totalCartPrice;
  }

  public onCheckout() {
    this.router.navigateByUrl('/order/details');
  }
}
