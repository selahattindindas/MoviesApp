import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentModule } from './component/component.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        ComponentModule
    ],
    exports: [
        LayoutModule
    ]
})

export class UiModule { }
