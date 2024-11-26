import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { OtpComponent } from './components/otp/otp.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, OtpVerificationComponent, OtpComponent],
  imports: [CommonModule, AuthRoutingModule, CoreModule, HttpClientModule],
  exports: [LoginComponent],
})
export class AuthModule {}