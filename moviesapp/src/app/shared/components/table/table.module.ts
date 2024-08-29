import { NgModule } from "@angular/core";
import { TableComponent } from "./table.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        TableComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
    ],
    exports:[
        TableComponent
    ]
})

export class TableModule{}