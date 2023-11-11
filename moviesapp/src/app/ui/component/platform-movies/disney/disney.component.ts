import { Component, ElementRef, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { ViewChild } from '@angular/core';

@Component({
  selector: 'disney-movie',
  templateUrl: './disney.component.html',
  styleUrls: ['./disney.component.css']
})
export class DisneyComponent implements OnInit {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>
  movies:List_Movie[] = [];
  slider: KeenSliderInstance = null;
  constructor(private movieService:MoviesService){}

  ngOnInit(): void {
      this.getMovies();
      this.getSlider();
  }

  async getMovies(){
    this.movies = await this.movieService.getAllMovies(PlatformEnum.Disney) as List_Movie[];
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
