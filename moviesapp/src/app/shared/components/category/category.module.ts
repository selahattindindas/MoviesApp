import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    exports:[
        CategoryComponent
    ]
})
export class CategoryModule{}