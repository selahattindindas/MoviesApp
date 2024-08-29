import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CategoryEnum } from 'src/app/constacts/category-enum';
import { DateEnum } from 'src/app/constacts/date-enum';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent extends BaseComponent implements OnInit {
  movies : List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  selectedCategory = CategoryEnum.Seciniz;
  
  constructor(private movieService: MoviesService, spinner:NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
      this.getMovies();
  }
  async getMovies(){
    this.componentSpinner(SpinnerType.JellyBox); 

    this.movieService.getAllMovies(undefined, DateEnum.Soon)
      .then(movieData => {
        this.movies = movieData as List_Movie[];
      })
      .finally(() => {
        this.spinner.hide(); 
      });

  } 
  async onCategorySelected(category: CategoryEnum) {
    this.selectedCategory = category;
  }
}
