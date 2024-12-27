import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/features/admin/state/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get isRegisterFormValid(): boolean {
    return this.registerForm.valid;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.registerForm?.controls[controlName].hasError(errorName);
  };

  public onSubmit() {
    if (!this.registerForm.valid) {
      return;
    } else {
      console.log(this.registerForm.value);
      this.authService
        .saveNewUser(this.registerForm.value)
        .subscribe((response: any) => {
          this.toastr.success(response.message);
          sessionStorage.setItem('accessToken', response?.response?.accessToken);
          sessionStorage.setItem('userName', response?.response?.userInfo.username);
          sessionStorage.setItem('email', response?.response?.userInfo.email);
          sessionStorage.setItem('role', response?.response?.userInfo.role);
          sessionStorage.setItem('userId', response?.response?.userInfo._id);

          if (response?.response?.userInfo.role === 'admin') {
            this.router.navigateByUrl('/admin/home');
          } else if (response?.response?.userInfo.role === 'user') {
            this.router.navigateByUrl('/order');
          }
        });
    }
  }
}
