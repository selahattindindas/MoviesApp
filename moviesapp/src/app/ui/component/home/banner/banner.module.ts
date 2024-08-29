import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { BannerComponent } from "./banner.component";

@NgModule({
    declarations: [
        BannerComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        PipeModule,
    ],
    exports:[
        BannerComponent
    ]
})
export class BannerModule{}