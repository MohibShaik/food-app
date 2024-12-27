import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MenuDialogComponent } from './components/menu-dialog/menu-dialog.component';
import { CoreModule } from 'src/app/core/core.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from 'src/app/features/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminLayoutComponent,
    MenuComponent,
    CustomersComponent,
    AnalyticsComponent,
    SettingsComponent,
    MenuDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, CoreModule ,SharedModule],
  exports: [MenuComponent],
})
export class HomeModule {}
