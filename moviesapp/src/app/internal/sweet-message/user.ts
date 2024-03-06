import { MessageType, Position } from "src/app/enums/sweetalert-enum";
import { MessageText, MessageTitle } from "../message-title";

export const SweetUser = {
    userRegister: {
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.UserRegister,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },

}