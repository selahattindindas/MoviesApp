import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const SELECTED_ZERO_ERROR_MESSAGE = 'Lütfen birini seçiniz.'
  
  export function categoryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === '0') {
            return { categorySelected: SELECTED_ZERO_ERROR_MESSAGE };
        }
        return null;
    };
}  