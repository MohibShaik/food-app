import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMenuItem } from 'src/app/features/admin/models/menuItem';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { MenuService } from 'src/app/features/admin/state/menu.service';
declare var bootstrap: any; // Import Bootstrap JavaScript APIs

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialogComponent implements OnInit, OnChanges {
  previewUrl: string | ArrayBuffer | null = null;
  @Input() selectedMenuItem!: IMenuItem;
  @Input() action!: string;
  form: FormGroup;
  selectedFile: File | null = null;
  public menuCategories!: any;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private toastr: ToastrService,
    public query: AdminQuery
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      price: [, Validators.required],
      quantity: [, Validators.required],
      images: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedMenuItem && this.action == 'edit') {
      this.previewUrl = this.selectedMenuItem.images;
      this.form.patchValue({
        name: this.selectedMenuItem.name,
        description: this.selectedMenuItem.description,
        category: this.selectedMenuItem.menuCategoryId?._id,
        price: this.selectedMenuItem.price,
        quantity: this.selectedMenuItem.quantity,
      });
    }
  }

  ngOnInit(): void {}

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile ? this.selectedFile : '');
    formData.append('name', this.form.controls['name'].value);
    formData.append('description', this.form.controls['description'].value);
    formData.append('category', this.form.controls['category'].value);
    formData.append('price', this.form.controls['price'].value);
    formData.append('quantity', this.form.controls['quantity'].value);

    if (this.action === 'add') {
      this.menuService.saveNewMenuItem(formData).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.closeModal();
          this.form.reset();
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      this.menuService
        .updateMenuItem(formData, this.selectedMenuItem._id)
        .subscribe(
          (response: any) => {
            this.toastr.success(response.message);
            this.closeModal();
            this.form.reset();
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
    }
  }

  closeModal() {
    const modalElement = document.getElementById('exampleModal'); // Get the modal element
    const modalInstance = bootstrap.Modal.getInstance(modalElement); // Get the Bootstrap modal instance
    modalInstance.hide(); // Hide the modal
  }
}
