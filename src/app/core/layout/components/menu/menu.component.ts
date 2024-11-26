import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/register-icon.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public activeTabIndex = 0; // Default to the first tab

  constructor(private service: DataService) {}
  public foodMenu!: any;

  ngOnInit(): void {
    this.getMenuData();
  }

  private getMenuData() {
    this.service.getMenu().subscribe((response) => {
      this.foodMenu = response;
    });
  }

  public selectTab(index: number): void {
    this.activeTabIndex = index;
  }
}
