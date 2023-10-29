import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageTitle, MessageText } from "../message-title";

export const SweetPhoto = {
    createPhoto:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PhotoCreate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deletedPhoto:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PhotoDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}