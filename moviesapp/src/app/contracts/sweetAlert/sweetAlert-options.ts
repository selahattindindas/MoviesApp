import { MessageType, Position } from "src/app/constacts/sweetalert-enum";

export class SweetAlert_Options{
    position: Position;
    messageTitle: string;
    messageText: string;
    icon: MessageType;
    showConfirmButton: boolean;
    showCancelButton: boolean;
    confirmButtonText: string;
    cancelButtonText: string;
    delay: number;
    timerProgressBar: boolean;
    toast: boolean;
    popup:string;
}