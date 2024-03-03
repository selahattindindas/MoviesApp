import { MessageType } from "src/app/enums/sweetalert-enum";
import { MessageText, MessageTitle } from "../message-title";

export const SweetUser = {
    userRegister:{
        messageTitle: MessageTitle.Success,
        messageText: MessageText.UserRegister,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },

}