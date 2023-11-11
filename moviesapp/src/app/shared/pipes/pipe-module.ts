import { NgModule } from '@angular/core';
import { TextFilterPipe } from 'src/app/shared/pipes/filter-pipe';
import { CustomDatePipe } from './date-pipe';
import { imageArrayPipe } from './image-pipe';
import { JoinArrayPipe } from './join-pipe';
import { LimitPipe } from './limit-pipe';
import { DateMovieFilterPipe } from './movieDateFilter-pipe';

@NgModule({
  declarations: [TextFilterPipe, CustomDatePipe, imageArrayPipe, JoinArrayPipe, LimitPipe, DateMovieFilterPipe],
  exports: [TextFilterPipe, CustomDatePipe, imageArrayPipe, JoinArrayPipe, LimitPipe, DateMovieFilterPipe]
})
export class SharedModule {}