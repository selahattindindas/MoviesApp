import { NgModule } from '@angular/core';
import { TextFilterPipe } from 'src/app/shared/pipes/filter-pipe';
import { CustomDatePipe } from './date-pipe';
import { imageArrayPipe } from './image-pipe';
import { JoinArrayPipe } from './join-pipe';
import { LimitPipe } from './limit-pipe';
import { CategoryFilterPipe } from './categoryFilter-pipe';

@NgModule({
  declarations: [TextFilterPipe, CustomDatePipe, imageArrayPipe, JoinArrayPipe, LimitPipe,CategoryFilterPipe ],
  exports: [TextFilterPipe, CustomDatePipe, imageArrayPipe, JoinArrayPipe, LimitPipe,CategoryFilterPipe ]
})
export class SharedModule {}