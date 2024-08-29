import { NgModule } from "@angular/core";
import { CategoryAndPlatformComponent } from "./category-and-platform.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ComponentModule } from "./components/component.module";

@NgModule({
  declarations: [
    CategoryAndPlatformComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CategoryAndPlatformComponent },
    ]),
    ComponentModule,
  ],
})
export class CategoryAndPlatformModule { }