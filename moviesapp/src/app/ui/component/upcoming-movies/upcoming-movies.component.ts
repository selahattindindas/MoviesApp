import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { DateEnum } from 'src/app/enums/date-enum';
import { SpinnerType } from 'src/app/enums/spinner-enum';
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
      this.componentSpinner(SpinnerType.JellyBox);
  }
  async getMovies(){
    this.movies = await this.movieService.getAllMovies(undefined,DateEnum.Yakinda) as List_Movie[];

  } 
  async onCategorySelected(category: CategoryEnum) {
    this.selectedCategory = category;
  }
}
