import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { List_Movie } from 'src/app/contracts/movie/list-movie';
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
    this.movies = await this.movieService.getAllMovies(PlatformEnum.Netflix) as List_Movie[];
  }
  
  getSlider(){
    setTimeout(()=>{
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop:true,
        slides: {
          perView: 3,
          spacing: 15,
        },
        drag: false
      })
    }, 200)
  }
}
