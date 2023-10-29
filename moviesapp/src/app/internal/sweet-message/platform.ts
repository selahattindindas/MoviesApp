import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageTitle, MessageText } from "../message-title";

export const SweetPlatform = {
    createPlatform:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlatformCreate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    updatePlatform:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlatformUpdate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deletedPlatform:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlatformDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}