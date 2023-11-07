import { Position, MessageType } from "src/app/enums/sweetalert-enum";
import { MessageTitle, MessageText } from "../message-title";

export const SweetCategory = {
    createCategory:{
        messageTitle: MessageTitle.Success,
        messageText: MessageText.CategoryCreate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    updateCategory:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.CategoryUpdate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deletedCategory:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.CategoryDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    }
}