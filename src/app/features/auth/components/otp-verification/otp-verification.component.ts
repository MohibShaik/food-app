import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/standlone/state/storage.service';
import { User } from '../../models/user.model';
// import { AuthService } from '../../state/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  public registeredUserInfo!: any;
  isResend = 0;
  otp!: string;
  otpBtnEnable!: boolean;
  resendOtp = false;
  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registeredUserInfo = JSON.parse(
      this.storage.getItem('registeredUserInfo')!
    );
    console.log(this.registeredUserInfo);
  }

  otpValue(data: any) {
    this.otp = '';
    for (let i = 0; i < data.otp.length; i++) {
      this.otp += data.otp[i].value;
    }
    // console.log("otp", this.otp);
    this.otpBtnEnable = this.otp.length === 4 ? true : false;
  }

  public resend() {}

  public verifyOTP() {
    const data = {
      email: this.registeredUserInfo?.email,
      OTP: this.otp,
    };

    // this.authService.verifyOTP(data).subscribe((response) => {
    //   sessionStorage.setItem('accessToken', response?.response?.accessToken);
    //   sessionStorage.setItem('id', response?.response?.userInfo?._id);
    //   this.router.navigateByUrl('/home/dashboard');
    // });
  }
}
