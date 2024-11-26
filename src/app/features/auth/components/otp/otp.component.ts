import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @Output() inputValue = new EventEmitter();
  @Input() details: any;
  @Input() resend: any;
  otpNumbers: any = [];
  keycode: any;
  size: any;
  counter = false;
  count = 0;

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= this.details; i++) {
      this.otpNumbers.push({
        num: i,
        value: '',
      });
    }
  }

  ngOnChanges() {
    if (this.resend > 0) {
      this.otpNumbers = [];
      this.ngOnInit();
    }
  }

  valueChange(i: any) {
    this.inputValue.emit({ otp: this.otpNumbers });

    if (this.keycode != 8) {
      if (i < this.details - 1) {
        let element = document.getElementById('_' + (i + 1));
        element?.focus();
      }
    }
  }

  keydown(e: any, i: any) {
    this.keycode = e.keyCode;
    if (this.keycode === 8) {
      if (i > 0 && i != this.details - 1) {
        let element = document.getElementById('_' + (i - 1));
        element?.focus();
      }
      if (i == this.details - 1) {
        if (this.count == 0) {
          let element = document.getElementById('_' + i);
          element?.focus();
          this.count++;
        } else if (this.count != 0) {
          let element = document.getElementById('_' + (i - 1));
          element?.focus();
          this.count = 0;
        }
      }
    }
  }
}
