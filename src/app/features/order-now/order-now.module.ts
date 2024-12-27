import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderNowRoutingModule } from './order-now-routing.module';
import { OrderNowComponent } from './components/order-now/order-now.component';
import { MenuComponent } from './components/menu/menu.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { TimerComponent } from './components/timer/timer.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    OrderNowComponent,
    MenuComponent,
    PlaceOrderComponent,
    CartComponent,
    OrderDetailsComponent,
    OrderConfirmationComponent,
    TimerComponent,
    SettingsComponent,
  ],
  imports: [CommonModule, OrderNowRoutingModule, CoreModule , FormsModule , ReactiveFormsModule],
})
export class OrderNowModule {}
