import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from '../../state/order.service';
import { AdminStore } from 'src/app/features/admin/state/admin.store';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { OrderStatus } from '../../enums/order-status.enum';
import { order } from '../../models/order.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent implements OnInit {
  public orderId!: any;
  public OrderStatus = OrderStatus;
  public timerStatus!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: OrderService,
    private store: AdminStore,
    public query: AdminQuery,
    private toastr: ToastrService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get('orderId');
    });
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.getCurrentOrderDetails(this.orderId);
    }
  }

  private getCurrentOrderDetails(orderId: string) {
    this.service.getOrderById(orderId).subscribe();
  }

  public async clearCart() {
    // this.totalCartPrice = 0;
    // this.store.update({ confirmedOrderInfo: [] });
    this.store.update({ cartItems: [] });
    this.store.update({ currentOrder: [] });
    this.router.navigate(['/order/menu']);
  }

  public checkTimerStatus(event: boolean) {
    this.timerStatus = event;
    if (this.timerStatus) {
      this.getCurrentOrderDetails(this.orderId);
      // this.checkConditionsToTriggerMail();
    }
  }

  public cancelOrder(orderInfo: order) {
    const payload = {
      orderId: orderInfo._id,
      status: OrderStatus.CANCELLED,
    };
    this.service.updateOrderStatus(payload).subscribe(
      (response) => {
        this.timerStatus = true;
        this.toastr.success(response?.message);
        // this.clearCart();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
