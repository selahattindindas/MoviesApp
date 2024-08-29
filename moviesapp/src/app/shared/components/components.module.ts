import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { CategoryModule } from "./category/category.module";
import { TableComponent } from './table/table.component';
import { CardModule } from "./card/card.module";
import { SliderModule } from "./slider/slider.module";
import { SearchModule } from "./search/search.module";
import { FormItemModule } from "./form-item/form-item.module";
import { FormMovieModule } from "./form-movie/form-movie.module";
import { TableModule } from "./table/table.module";

@NgModule({
    declarations: [
        ButtonComponent,
    ],
    imports:[
        CommonModule,
        CategoryModule,
        CardModule,
        SliderModule,
        SearchModule,
        FormItemModule,
        FormMovieModule,
        TableModule
    ],
    exports:[
        ButtonComponent,
    ]
})
export class ComponentModule{}