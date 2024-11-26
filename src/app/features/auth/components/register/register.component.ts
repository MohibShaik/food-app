import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/standlone/state/storage.service';
// import { AuthService } from '../../state/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye_off';

  get f() {
    return this.registerForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['vendor', [Validators.required]],
      isActive: [true, [Validators.required]],
      password: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      createdBy: ['66a88884ac26496c9632b9ea', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  public checkFormError = (controlName: string, errorName: string) => {
    return this.registerForm?.controls[controlName].hasError(errorName);
  };

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye_off' ? 'eye_on' : 'eye_off';
  }

  public onSignUpClick() {
    if (this.registerForm.valid) {
      
    } else {
      return;
    }
  }
}
