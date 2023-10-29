import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageTitle, MessageText } from "../message-title";

export const SweetDirectors = {
    createDirectors:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.DirectorCreate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deletedDirectors:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.DirectorDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}