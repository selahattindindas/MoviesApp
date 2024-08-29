import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { CardComponent } from "./card.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        CardComponent
    ],
    imports:[
        CommonModule,
        PipeModule,
        RouterModule
    ],
    exports:[
        CardComponent,
    ]
})
export class CardModule{}