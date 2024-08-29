import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoryComponent } from "./category/category.component";
import { PlatformComponent } from "./platform/platform.component";
import { TableModule } from "../../../../shared/components/table/table.module";

@NgModule({
    declarations: [
        CategoryComponent,
        PlatformComponent
    ],
    imports: [
    CommonModule,
    TableModule
],
    exports: [
        CategoryComponent,
        PlatformComponent
    ],
  })
  export class ComponentModule { }