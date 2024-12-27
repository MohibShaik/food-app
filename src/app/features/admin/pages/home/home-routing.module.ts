import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomOrdersListComponent } from 'src/app/features/shared/components/custom-orders-list/custom-orders-list.component';
import { CustomLayoutComponent } from 'src/app/features/shared/components/custom-layout/custom-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'orders',
        component: CustomOrdersListComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
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
export class HomeRoutingModule {}
