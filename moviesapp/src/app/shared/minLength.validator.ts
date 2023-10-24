import { AbstractControl, ValidationErrors } from '@angular/forms';

const ERROR_MESSAGE = (minLength: number) => `Minimum ${minLength} karakter gereklidir.`;

export function minLengthValidator(minLength: number): (control: AbstractControl) => ValidationErrors | null {
  const errorMessage = ERROR_MESSAGE(minLength);
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length < minLength) {
      return { messageMinLength: errorMessage };
    }
    return null;
  };
}
