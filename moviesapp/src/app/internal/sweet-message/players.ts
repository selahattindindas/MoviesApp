import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageTitle, MessageText } from "../message-title";

export const SweetPlayers = {
    createPlayers:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlayerCreate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deletedPlayers:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlayerDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}