import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";

@NgModule({
    declarations: [
        UserComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: UserComponent}
        ]),
    ],
    exports:[]
})
export class UserModule{}