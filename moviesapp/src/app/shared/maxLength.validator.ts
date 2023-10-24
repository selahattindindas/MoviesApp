import { AbstractControl, ValidationErrors } from '@angular/forms';

const ERROR_MESSAGE = (maxLength: number) => `Maksimum ${maxLength} karakter gereklidir.`;

export function maxLengthValidator(maxLength: number): (control: AbstractControl) => ValidationErrors | null {
  const errorMessage = ERROR_MESSAGE(maxLength);
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length > maxLength) {
      return { messageMaxLength: errorMessage };
    }
    return null;
  };
}
