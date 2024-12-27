import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var bootstrap: any; // Import Bootstrap JavaScript APIs

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  @Input() action!: string;
  @Input() title!: string;
  @Input() message!: string;
  @Output() confirmationValue = new EventEmitter<boolean>(false);

  public onConfirmation(value: boolean) {
    this.confirmationValue.emit(value);
    this.closeModal();
  }

  closeModal() {
    const modalElement = document.getElementById('confirmationModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide(); // Hide the modal
  }
}
