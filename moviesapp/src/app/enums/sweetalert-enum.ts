export class SweetAlert_Options{
    position?: Position = Position.Center;
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

export enum MessageType {
    Error = 'error',
    Message = 'messageTitle',
    Notify = 'notify',
    Success = 'success',
    Warning = 'warning',
  }

export enum Position {
    TopCenter = "top-center",
    TopRight = "top-right",
    TopLeft = "top-left",
    Center = "center",
    BottomRight = "bottom-right",
    BottomCenter = "bottom-center",
    BottomLeft = "bottom-left"
}
