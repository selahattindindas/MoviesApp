import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { DateEnum } from 'src/app/enums/date-enum';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {
  movies : List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  selectedCategory = CategoryEnum.Seciniz;
  
  constructor(private movieService: MoviesService){}

  ngOnInit(): void {
      this.getMovies();
  }
  async getMovies(){
    this.movies = await this.movieService.getAllMovies(undefined,DateEnum.Yakinda) as List_Movie[];

  } 
  async onCategorySelected(category: CategoryEnum) {
    this.selectedCategory = category;
  }
}
