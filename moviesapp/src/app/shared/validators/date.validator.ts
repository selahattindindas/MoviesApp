import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateFormatValidator(control: AbstractControl){
    const inputValue = control.value;

  // Tarih formatını kontrol etmek için uygun bir mantık geliştirin
  // Örnek: YYYY-MM-DD formatını kontrol edelim
  const pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!pattern.test(inputValue)) {
    return { customDateFormat: true };
  }

  return null; 
  }
  
