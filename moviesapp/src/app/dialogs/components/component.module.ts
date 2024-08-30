import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { PlayerModule } from "./players/players.module";
import { DirectorModule } from "./directors/directors.module";
import { PhotoModule } from "./photo/photo.module";

@NgModule({
    declarations:[
    ],
    imports:[
        CommonModule,
        FormsModule,
        PipeModule,
        PlayerModule,
        DirectorModule,
        PhotoModule
    ],
})

export class ComponentModule{}