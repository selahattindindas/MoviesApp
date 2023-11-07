import { Component, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance = null;
  movies: List_Movie[];
  constructor(private movieService:MoviesService){}
ngAfterViewInit() {
  setTimeout(() => {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      initial: this.currentSlide,
      slideChanged: (s) => {
        this.currentSlide = s.track.details.rel
      },
    })
    this.dotHelper = [
      ...Array(this.slider.track.details.slides.length).keys(),
    ]
  })
}

ngOnDestroy() {
  if (this.slider) this.slider.destroy()
}
}