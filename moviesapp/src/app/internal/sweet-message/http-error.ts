import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageText, MessageTitle } from "../message-title";

export const SweetHttpError ={
    serverError:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Error,
        messageText: MessageText.ServerError,
        icon: MessageType.Error,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}