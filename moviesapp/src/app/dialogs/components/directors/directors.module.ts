import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormItemModule } from "src/app/shared/components/form-item/form-item.module";
import { FormsModule } from "@angular/forms";
import { DirectorsComponent } from "./directors.component";

@NgModule({
    declarations: [
        DirectorsComponent
    ],
    imports:[
        CommonModule,
        FormItemModule,
        FormsModule
    ],
    exports:[
        DirectorsComponent,
    ]
})
export class DirectorModule{}