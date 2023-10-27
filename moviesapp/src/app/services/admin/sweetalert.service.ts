import { Injectable } from '@angular/core';
import { SweetAlert_Options } from 'src/app/enums/sweetalert-enum';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
declare var sweetalert2: any;
@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  async showAlert(options: Partial<SweetAlert_Options>) {
    const result: SweetAlertResult<any> = await Swal.fire({
      title: options.messageTitle,
      text: options.messageText,
      icon: options.icon as SweetAlertIcon,
      showCancelButton: options.showCancelButton,
      confirmButtonText: options.confirmButtonText,
      timer: options.delay * 1000,
      cancelButtonText: options.cancelButtonText,
    });
    return result;
  }
}

//Enum buraya yazılmayacak ayrı bir enum oluşturulup oradan çekilecek.