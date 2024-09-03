import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { NewsListComponent } from "./news-list.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        NewsListComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: NewsListComponent}
        ]),
    ],
    exports:[]
})
export class NewListModule{}