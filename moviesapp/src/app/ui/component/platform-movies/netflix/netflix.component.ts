import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { DateEnum } from 'src/app/enums/date-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'netflix-movie',
  templateUrl: './netflix.component.html',
  styleUrls: ['./netflix.component.css']
})
export class NetflixComponent implements OnInit {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>
  movies:List_Movie[]  = [];
  slider: KeenSliderInstance;
  constructor(private movieService:MoviesService){}
  ngOnInit() {
      this.getMovies();
      this.getSlider();
  }
  async getMovies(){
    this.movies = await this.movieService.getAllMovies(PlatformEnum.Netflix, DateEnum.Vizyonda) as List_Movie[];
  }
  
  getSlider(): void {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: true,
        drag: false,
        breakpoints: {
          "(min-width: 350px)": {
            slides: { perView: 1, spacing: 5 },
          },
          "(min-width: 600px)": {
            slides: { perView: 2, spacing: 10 },
          },
          "(min-width: 1150px)": {
            slides: { perView: 3, spacing: 15 },
          },
        },
      });
    }, 200);
  }
}
