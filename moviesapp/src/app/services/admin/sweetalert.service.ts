import { Injectable } from '@angular/core';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message_title';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  async showAlert(messageTitle:string, messageText:string, icon:icon,showCancelButton:boolean, confirmButtonText:string,
    delay?:number,cancelButtonText?:string,) {
    const result: SweetAlertResult<any> = await Swal.fire({
      title: messageTitle,
      text: messageText,
      icon : icon as SweetAlertIcon,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      timer:delay ? delay * 1000 : undefined,
      cancelButtonText: cancelButtonText,
    });
    return result;
  }
}
export enum icon {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
