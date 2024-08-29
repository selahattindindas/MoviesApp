import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoryModule } from "src/app/shared/components/category/category.module";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: LoginComponent}
        ]),
        ReactiveFormsModule,
        CategoryModule
    ],
    exports:[]
})
export class LoginModule{}