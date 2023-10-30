import { Injectable } from '@angular/core';
import { SweetAlert_Options } from 'src/app/contracts/sweetAlert/sweetAlert-options';
import Swal, { SweetAlertIcon, SweetAlertPosition, SweetAlertResult } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  async showAlert(options: Partial<SweetAlert_Options>){
    const result: SweetAlertResult<any> = await Swal.fire({
      position: options.position as SweetAlertPosition,
      title: options.messageTitle,
      text: options.messageText,
      icon: options.icon as SweetAlertIcon,
      showConfirmButton: options.showConfirmButton,
      showCancelButton: options.showCancelButton,
      confirmButtonText: options.confirmButtonText,
      cancelButtonText: options.cancelButtonText,
      timerProgressBar: options.timerProgressBar,
      toast: options.toast,
      timer: options.delay * 1000,
    });
    return result;
  }
  }

//Enum buraya yazılmayacak ayrı bir enum oluşturulup oradan çekilecek. //YAPILDI