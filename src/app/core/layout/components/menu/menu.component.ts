import { Component, OnInit, SecurityContext, Sanitizer } from '@angular/core';
import { DataService } from '../../services/register-icon.service';
import { ToastrService } from 'ngx-toastr';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { MenuService } from 'src/app/features/admin/state/menu.service';
import { BehaviorSubject } from 'rxjs';
import { IMenuCategory } from 'src/app/features/admin/models/menuCategory';
import { IMenuItem } from 'src/app/features/admin/models/menuItem';
import { AdminStore } from 'src/app/features/admin/state/admin.store';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(
    private menuService: MenuService,
    public query: AdminQuery,
    private toastr: ToastrService,
    public store: AdminStore,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getMenuCats();
    this.getMenu();
  }

  private getMenu() {
    this.menuService.getMenu().subscribe((response) => {
      this.foodMenu = response?.response;
      this.filterMenu(this.activeTabIndex);
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

  private filterMenu(activeTabIndex: number) {
    const activeCategory = this.menuCategories.filter(
      (item, index) => index === activeTabIndex
    );
    if (activeCategory) {
      const filtered = this.foodMenu.filter(
        (x) => x?.menuCategoryId?._id === activeCategory[0]?._id
      );
      this.filteredFoodMenuSubject.next(filtered); // Emit filtered menu
    }
  }

  public selectTab(index: number): void {
    this.activeTabIndex = index;
    this.filterMenu(this.activeTabIndex);
  }

  formatPrice(price: number): number { // Now just return the number
    return price;
  }
}
