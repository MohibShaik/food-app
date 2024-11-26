import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() onSignIn = new EventEmitter();

  public loginForm!: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye_off';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  public initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye_off' ? 'eye_on' : 'eye_off';
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.loginForm?.controls[controlName].hasError(errorName);
  };

  public login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();
      
    }
  }
}
