import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IMenuCategory } from 'src/app/features/admin/models/menuCategory';
import { IMenuItem } from 'src/app/features/admin/models/menuItem';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { MenuService } from 'src/app/features/admin/state/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public activeTabIndex = 0;
  public action = 'add';
  public title = '';
  public message = '';
  foodMenu!: IMenuItem[];
  private filteredFoodMenuSubject = new BehaviorSubject<IMenuItem[]>([]);
  filteredFoodMenu$ = this.filteredFoodMenuSubject.asObservable();
  menuCategories!: IMenuCategory[];
  showHoverText: boolean = false;
  selectedMenuItem!: IMenuItem;

  constructor(
    private menuService: MenuService,
    public query: AdminQuery,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMenu();
    this.getMenuCats();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        setTimeout(() => {
          this.getMenu();
        }, 2000);
      });
    }
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

  public toggleCardHover(item: IMenuItem, value: boolean) {
    item.showHoverText = value;
  }

  public editMenuItem(item: IMenuItem) {
    this.selectedMenuItem = item;
    this.action = 'edit';
  }

  public deleteMenuItem(item: IMenuItem) {
    this.selectedMenuItem = item;
    this.action = 'delete';
    this.title = 'Delete';
    this.message = 'Are you sure you want to delete the item?';
  }

  public onDeleteConfirmation(event: boolean) {
    if (event) {
      this.menuService.deleteMenuItem(this.selectedMenuItem?._id).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.getMenu();
          // this.closeModal();
          // this.form.reset();
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }
}
