import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, OnInit} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements  OnInit, OnDestroy,AfterViewInit  {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  slider: KeenSliderInstance;
  movies: List_Movie[];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    this.movies = await this.movieService.getAllMovies(PlatformEnum.Sinema) as List_Movie[];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        loop: true,
      }, [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
  
          function nextTimeout() {
            clearTimeout(timeout);
  
            if (mouseOver) return;
  
            timeout = setTimeout(() => {
              slider.next();
            }, 4000);
          };
  
          slider.on("slideChanged", (slider) => {
            this.currentSlide = slider.track.details.rel;
          });
  
          nextTimeout();
  
          slider.on("animationEnded", nextTimeout);
          slider.on("updated", nextTimeout);
        },
      ]);
    }, 200);
  }
  

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

}
