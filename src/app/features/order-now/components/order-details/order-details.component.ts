import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { phoneNumberValidator } from 'src/app/standlone/validators/phone-number-validator';
import { OrderService } from '../../state/order.service';
import { Options, TempusDominus } from '@eonasdan/tempus-dominus';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminStore } from 'src/app/features/admin/state/admin.store';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnChanges {
  @Input() totalCartPrice!: number;
  public cartItems = this.query.getValue().cartItems;
  public orderDetailsForm: FormGroup;
  public userName = sessionStorage.getItem('userId');

  constructor(
    public fb: FormBuilder,
    public query: AdminQuery,
    private service: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private store: AdminStore
  ) {
    this.orderDetailsForm = this.initFormGroup();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.orderDetailsForm.patchValue({
      orderTotal: changes['totalCartPrice'].currentValue,
    });
  }

  private initFormGroup() {
    return this.fb.group({
      requester: [this.userName],
      orderTotal: [this.totalCartPrice],
      deliveryType: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      phoneNumber: ['', [Validators.required, phoneNumberValidator]],
      requestedItems: [this.cartItems, Validators.required],
      requesterLocation: [''],
      paymentStatus: [false],
    });
  }

  public onSubmit() {
    if (this.orderDetailsForm.valid) {
      this.service
        .saveNewOrder(this.orderDetailsForm.value)
        .subscribe((response) => {
          if (response?.statusCode === 201) {
            this.toastr.success(response.message);
            this.store.update({ cartItems: [] });
            this.router.navigateByUrl(
              `/order/${response?.data?.orderId}/confirm`
            );
          }
        });
    }
  }
}
