import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/category-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { DateEnum } from 'src/app/enums/date-enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/enums/spinner-enum';

@Component({
  selector: 'app-cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.css']
})
export class CinemaMoviesComponent extends BaseComponent implements OnInit {
  movie: List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  selectedCategory = CategoryEnum.Seciniz;

  constructor(private movieService: MoviesService, spinner: NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.getMovies();
    this.componentSpinner(SpinnerType.JellyBox);
  }

  async getMovies() {
    this.movie = await this.movieService.getAllMovies(PlatformEnum.Sinema, DateEnum.Vizyonda) as List_Movie[];
  }

  async onCategorySelected(category: CategoryEnum) {
    this.selectedCategory = category;
  }
}
