
import { MessageType, Position } from "src/app/enums/sweetalert-enum";
import { MessageText, MessageTitle } from "../message-title";

export const SweetMovie = {
    createsMovie:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.MovieCreate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    updateMovie:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.MovieUpdate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deleteMovie:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.MovieDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}
