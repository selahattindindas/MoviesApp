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
  categoryEnum: CategoryEnum[] = [];
  categoryDescriptions: { [key in number]: string } = {};
  platformEnum: PlatformEnum[] = [];
  platformDescriptions: { [key in number]: string } = {};
  movies:List_Movie
  constructor( private fb: FormBuilder,private categoryService: CategoryService,private platformService: PlatformService,private movieService: MoviesService, private activatedRoute: ActivatedRoute) {
    this.updateForm = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0'),
      platformId: new FormControl('0'),
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
    this.categoryEnum = this.categoryService.getCategoryEnumValues();
    this.categoryDescriptions = this.categoryService.getCategoryDescriptions();
    this.categoryEnum = this.categoryEnum.filter((item) => item !== CategoryEnum.Seciniz);
  }
  getPlatform() {
    this.platformEnum = this.platformService.getPlatformEnumValues();
    this.platformDescriptions = this.platformService.getPlatformDescriptions();
    this.platformEnum = this.platformEnum.filter((item) => item !== PlatformEnum.Seciniz);
  }
  getMovieById() {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      const movieData: Partial<List_Movie> = await this.movieService.getMovieId(params['id']);
      if (movieData) 
      this.movies = movieData as List_Movie;
      this.movieId = params['id'];
    });
  }
  update() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      const movie: Update_Movie = {
        id: formData.id,
        name: formData.Name,
        categoryId: formData.categoryId,
        platformId: formData.platformId,
        releaseDate: new Date(formData.date),
        movieTime: formData.time,
        description: formData.details,
      };
       this.movieService.updateMovie(movie, this.movieId);
    }
  }
}
