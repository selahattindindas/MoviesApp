import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageTitle, MessageText, ConfirmButtonText, CancelButtonText } from "../message-title";

export const SweetCommon = {
    DeletedQuestion:{
        position: Position.Center,
        messageTitle: MessageTitle.DeletedQuestion,
        messageText: MessageText.NoTurningBack,
        icon: MessageType.Warning,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: ConfirmButtonText.Okey,
        cancelButtonText: CancelButtonText.Cancel,
    }
}