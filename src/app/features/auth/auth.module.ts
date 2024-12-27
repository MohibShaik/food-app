import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, CoreModule],
})
export class AuthModule {}
