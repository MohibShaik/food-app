import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/features/admin/state/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get isLoginFormValid(): boolean {
    return this.loginForm.valid;
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.loginForm?.controls[controlName].hasError(errorName);
  };

  public onSubmit() {
    if (!this.loginForm.valid) {
      return;
    } else {
      this.authService
        .login(this.loginForm.value)
        .subscribe((response: any) => {
          this.toastr.success(response.message);
          sessionStorage.setItem('accessToken', response?.data?.accessToken);
          sessionStorage.setItem('userName', response?.data?.username);
          sessionStorage.setItem('email', response?.data?.email);
          sessionStorage.setItem('role', response?.data?.role);
          sessionStorage.setItem('userId', response?.data?._id);

          if (response?.data.role === 'admin') {
            this.router.navigateByUrl('/admin');
          } else if (response?.data.role === 'user') {
            this.router.navigateByUrl('/order');
          }
        });
    }
  }
}
