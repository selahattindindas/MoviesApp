import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PipeModule } from "src/app/shared/pipes/pipe-module";

@NgModule({
    declarations:[
        PhotoComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        PipeModule
    ],
    exports:[

    ]
})

export class PhotoModule{}