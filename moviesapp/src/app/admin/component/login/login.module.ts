import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: LoginComponent}
        ]),
        FormsModule
    ],
    exports:[
        LoginComponent
    ]
})
export class LoginModule{}