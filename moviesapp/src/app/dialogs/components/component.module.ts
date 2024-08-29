import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { PhotoComponent } from "./photo/photo.component";
import { PlayerModule } from "./players/players.module";
import { DirectorModule } from "./directors/directors.module";

@NgModule({
    declarations:[
        PhotoComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        PipeModule,
        PlayerModule,
        DirectorModule,
    ],
})

export class ComponentModule{}