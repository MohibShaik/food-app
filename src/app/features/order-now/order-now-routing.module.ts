import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderNowComponent } from './components/order-now/order-now.component';
import { MenuComponent } from './components/menu/menu.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomOrdersListComponent } from '../shared/components/custom-orders-list/custom-orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderNowComponent,
    children: [
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full',
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'details',
        component: PlaceOrderComponent,
      },
      {
        path: ':orderId/confirm',
        component: OrderConfirmationComponent,
      },
      {
        path: 'list',
        component: CustomOrdersListComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderNowRoutingModule {}
