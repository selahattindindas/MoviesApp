import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormItemComponent } from "./form-item.component";

@NgModule({
    declarations: [
        FormItemComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    exports:[
        FormItemComponent
    ]
})
export class FormItemModule{}