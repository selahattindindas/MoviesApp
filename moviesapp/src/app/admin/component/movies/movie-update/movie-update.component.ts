import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { List_Category } from 'src/app/contracts/category/list-category';
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
  category: CategoryEnum;
  constructor(
    private fb: FormBuilder, private categoryService: CategoryService, private platformService: PlatformService, private movieService: MoviesService, private activatedRoute: ActivatedRoute) {
    this.updateForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0', Validators.required),
      platformId: new FormControl('4', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      time: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
    setTimeout(()=>{
      this.updateForm.controls["categoryId"].setValue(this.movies.categoryName),
      this.updateForm.controls["platformId"].setValue(this.movies.platformName)
    },200)
  }

  ngOnInit(): void {
    this.getPlatform();
    this.getMovieById();
    this.getCategory();
  }

  getCategory() {
    return this.categoryService.getCategoryEnumValues(CategoryEnum.Seciniz.toString()).then(categoryData=>{
      this.categoryEnum = categoryData;
    })
  }

  getPlatform() {
    return this.platformService.getPlatformEnumValues(PlatformEnum.Seciniz.toString()).then(platformData =>{
      this.platformEnum = platformData
    })
  }

  getMovieById() {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      const movieData: Partial<List_Movie | string> = await this.movieService.getMovieById(params['id']);
      if (movieData) {
        this.movies = movieData as List_Movie;
        this.movieId = params['id'];
      }
    });
  }

  update(movieId: string) {
    if (!this.updateForm.valid) {
      return;
    }

    const formData = this.updateForm.value;
  
    const selectedCategory = this.categoryEnum.find(item => item.description === formData.categoryId);
    const categoryId = selectedCategory ? selectedCategory.value : 0;

    const selectedPlatform = this.platformEnum.find(item => item.description === formData.platformId);
    const platformId = selectedPlatform ? selectedPlatform.value : 4;
  
    const movie: Update_Movie = {
      id: movieId,
      name: formData.name,
      categoryId: categoryId,
      platformId: platformId,
      releaseDate: new Date(formData.date),
      movieTime: formData.time,
      description: formData.details,
    };

    this.movieService.updateMovie(movie);
  }
}
