import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AdminStore } from '../../admin/state/admin.store';
import { endPoint } from '../../admin/constants/api-route.constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, public store: AdminStore) {}

  public getDeliveryTypes(): Observable<any> {
    return this.http.get('../../../../assets/config/delivery-type.json').pipe(
      tap((response: any) => {
        this.store.update({ deliveryTypes: response });
      })
    );
  }

  public saveNewOrder(orderInfo: any): Observable<any> {
    return this.http.post(endPoint.saveNewOrder, orderInfo);
  }

  public getOrderById(orderId: string) {
    return this.http.get(endPoint.getOrderById(orderId)).pipe(
      map((response: any) => {
        this.store.update({ currentOrder: response?.data });
        return response.data;
      })
    );
  }

  public updateOrderStatus(payload: any) {
    return this.http.post(endPoint.updateOrderStatus, payload).pipe(
      map((response: any) => {
        this.store.update({ currentOrder: response?.data });
        return response;
      })
    );
  }

  public getOrderStatusFilters(): Observable<any> {
    return this.http.get('../../../../assets/config/order-status.json').pipe(
      map((response: any) => {
        this.store.update({ orderStatusFilters: response });
        return response;
      })
    );
  }

  public getOrdersByUserId(userId: string) {
    return this.http.get(endPoint.getOrderByUserId(userId)).pipe(
      map((response: any) => {
        this.store.update({ ordersList: response?.response });
        return response.response;
      })
    );
  }

  public getAllOrders(
    payload: {
      startDate: Date;
      endDate: Date;
    },
    pageIndex: number,
    pageSize: number
  ) {
    return this.http
      .post(endPoint.getAllOrders(pageIndex, pageSize), payload)
      .pipe(
        map((response: any) => {
          this.store.update({ ordersList: response?.response?.data });
          return response?.response?.data;
        })
      );
  }
}
