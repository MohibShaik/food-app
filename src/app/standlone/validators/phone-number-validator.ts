import { AbstractControl, ValidationErrors } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function phoneNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return { required: true };
  }

  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return { invalidPhoneNumber: true };
  }

  return null;
}
