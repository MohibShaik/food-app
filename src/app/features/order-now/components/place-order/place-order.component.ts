import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../state/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  public totalCartPrice!: number;
  constructor(public orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getDeliveryTypes().subscribe();
  }

  cartPrice(event: number) {
    this.totalCartPrice = event;
  }
}
