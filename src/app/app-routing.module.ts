import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/layout/components/landing-page/landing-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/order-now/order-now.module').then(
        (m) => m.OrderNowModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
