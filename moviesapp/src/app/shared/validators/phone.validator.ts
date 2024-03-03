import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;

    const phoneNumberPattern = /^[0-9]*$/;

    if (!phoneNumber || phoneNumber.length !== 10 || phoneNumber.startsWith('0') || !phoneNumberPattern.test(phoneNumber)) {
      return { 'invalidPhoneNumber': { value: phoneNumber } };
    }

    return null;
  };
}
