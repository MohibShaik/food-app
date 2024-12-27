import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { OrderService } from 'src/app/features/order-now/state/order.service';

@Component({
  selector: 'app-custom-orders-list',
  templateUrl: './custom-orders-list.component.html',
  styleUrls: ['./custom-orders-list.component.scss'],
})
export class CustomOrdersListComponent implements OnInit {
  public currentDate = new Date();
  public selectedOrderStatusFilter = 'All';
  public userId = sessionStorage.getItem('userId')!;
  public userRole = sessionStorage.getItem('role')!;
  public orderStatusFilters = this.query.getValue().orderStatusFilters!;
  public startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  public endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

  get isAdmin(): boolean {
    return this.userRole.toLowerCase() === 'admin';
  }
  constructor(private orderService: OrderService, public query: AdminQuery) {
    this.userRole.toLowerCase() === 'admin'
      ? this.getAllOrders(
          {
            status: [],
            startDate: moment
              .utc(this.startOfMonth)
              .set({ hour: 0, minute: 0 }),
            endDate: moment.utc(this.endOfMonth).set({ hour: 23, minute: 0 }),
          },
          0,
          10
        )
      : this.getOrdersByUserId();
  }

  ngOnInit(): void {
    this.getOrderStatusFilters();
  }

  private getOrderStatusFilters() {
    this.orderService.getOrderStatusFilters().subscribe();
  }

  private getOrdersByUserId() {
    this.orderService.getOrdersByUserId(this.userId).subscribe();
  }

  private getAllOrders(payload: any, currentPage: number, pageSize: number) {
    this.orderService
      .getAllOrders(payload, currentPage, pageSize)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  public onFilterBadgeClick(filter: string) {
    this.selectedOrderStatusFilter = filter;
  }

  public filterMenu(ordersList: any) {
    const result = ordersList.filter((order: any) => {
      if (this.selectedOrderStatusFilter.toLowerCase() === 'all') {
        return order;
      } else {
        return (
          order.status.toLowerCase() ===
          this.selectedOrderStatusFilter.toLowerCase()
        );
      }
    });

    return result;
  }
}
