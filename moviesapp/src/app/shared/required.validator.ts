import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const ERROR_MESSAGE = 'Bu alanı doldurmak zorunludur.';

export function requiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
          return { required: ERROR_MESSAGE };
        }
      return null;
    };
  }
  
  