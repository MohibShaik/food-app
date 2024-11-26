import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
// import { MaterialModule } from './modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../features/auth/components/login/login.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
// import { SideNavComponent } from './layout/components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/token.interceptor';
import { ErrorHttpInterceptor } from './interceptors/http.interceptor';
// import { GreetingComponent } from './layout/components/greeting/greeting.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LandingPageComponent } from './layout/components/landing-page/landing-page.component';
import { HomeComponent } from './layout/components/home/home.component';
import { MenuComponent } from './layout/components/menu/menu.component';
import { CateringComponent } from './layout/components/catering/catering.component';
import { AboutComponent } from './layout/components/about/about.component';
import { ContactComponent } from './layout/components/contact/contact.component';

@NgModule({
  declarations: [
    // SideNavComponent,
    LayoutComponent,
    FooterComponent,
    // GreetingComponent,
    LandingPageComponent,
    HomeComponent,
    MenuComponent,
    CateringComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // SideNavComponent,
    LayoutComponent,
    FooterComponent,
    RouterModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
})
export class CoreModule {}
