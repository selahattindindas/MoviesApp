import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'app-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  movieId: string;
  categoryEnum: { value: CategoryEnum; description: string; }[];
  platformEnum:{ value: PlatformEnum; description: string; }[];
  movies: List_Movie;
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private platformService: PlatformService, private movieService: MoviesService, private activatedRoute: ActivatedRoute) {
    this.updateForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl(''),
      platformId: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
      details: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.getCategory();
    this.getPlatform();
    this.getMovieById();
  }
  getCategory() {
    this.categoryEnum = this.categoryService.getCategoryEnumValues(CategoryEnum.Seciniz.toString());
  }
  getPlatform() {
    this.platformEnum = this.platformService.getPlatformEnumValues(PlatformEnum.Seciniz.toString());
  }
  getMovieById() {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      const movieData: Partial<List_Movie> = await this.movieService.getMovieById(params['id']);
      if (movieData)
        this.movies = movieData as List_Movie;
      this.movieId = params['id'];
    });
  }
  update() {
    if (!this.updateForm.valid) {
      return;
    }

    const formData = this.updateForm.value;
    const movie: Update_Movie = {
      name: formData.name,
      categoryId: formData.categoryId,
      platformId: formData.platformId,
      releaseDate: formData.date,
      movieTime: formData.time,
      description: formData.details,
    };
    this.movieService.updateMovie(movie, this.movieId);
  }
}
