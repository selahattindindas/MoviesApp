import { NgModule } from "@angular/core";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { ComponentModule } from "./components/components.module";

@NgModule({
    declarations: [

    ],
    imports:[
        ComponentModule
    ],
    exports:[

    ]
})
export class SharedModule{}