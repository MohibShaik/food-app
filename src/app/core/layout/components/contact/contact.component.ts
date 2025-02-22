import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ContactService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildContactForm();
  }

  private buildContactForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      from: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  public sendMessage() {
    if (this.contactForm.valid) {
      this.service.sendMessage(this.contactForm.value).subscribe(
        (response) => {
          this.contactForm.reset();
          this.toastr.success(response.message);
        },
        (error) => {
          this.toastr.error(
            "We're sorry, but something didn't work as expected."
          );
        }
      );
    } else {
      this.toastr.error('Please fill the required fields.');
    }
  }
}
