import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { RouterModule } from "@angular/router";
import { SliderComponent } from "./slider.component";

@NgModule({
    declarations: [
        SliderComponent
    ],
    imports:[
        CommonModule,
        PipeModule,
        RouterModule
    ],
    exports:[
        SliderComponent
    ]
})
export class SliderModule{}