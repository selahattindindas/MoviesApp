import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayersComponent } from "./players.component";
import { FormItemModule } from "src/app/shared/components/form-item/form-item.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        PlayersComponent
    ],
    imports:[
        CommonModule,
        FormItemModule,
        FormsModule
    ],
    exports:[
        PlayersComponent,
    ]
})
export class PlayerModule{}