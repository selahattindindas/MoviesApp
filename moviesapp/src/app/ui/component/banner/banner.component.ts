import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance = null;
  movies: List_Movie[];
  @ViewChild('sliderContainer') sliderContainer: ElementRef;
  constructor(private movieService:MoviesService){}
  ngOnInit() {
    this.movieService.getAllMovies().then((movies: List_Movie[]) => {
      this.movies = movies; // Assign the fetched data to the movies array

      // Create the KeenSlider instance with dynamic data
      this.slider = new KeenSlider(this.sliderContainer.nativeElement, {
        initial: this.currentSlide,
      
      });

    
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}