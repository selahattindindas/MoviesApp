import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { NewsListComponent } from "./news-list.component";

@NgModule({
    declarations: [
        NewsListComponent,
    ],
    imports:[
        RouterModule.forChild([
            {path: '', component: NewsListComponent}
        ]),
    ],
    exports:[]
})
export class NewListModule{}