import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ComponentModule } from "./components/component.module";

@NgModule({
    declarations: [
      LayoutComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ComponentModule
    ],
    exports:[
      LayoutComponent
    ]
  })

export class LayoutModule{}