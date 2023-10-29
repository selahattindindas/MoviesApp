import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { SweetMovie } from 'src/app/internal/sweet-message/movie';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { PlatformService } from 'src/app/services/common/models/platform.service';
import { categoryValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'app-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  movieId: number;
  categoryEnum: { value: CategoryEnum; description: string; }[];
  platformEnum: { value: PlatformEnum; description: string; }[];
  movies: List_Movie;
  category: CategoryEnum;

  constructor(
    private fb: FormBuilder, private categoryService: CategoryService, private platformService: PlatformService,
    private movieService: MoviesService, private route: ActivatedRoute, private sweetAlertService: SweetalertService, private router: Router) {
    this.updateForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0', categoryValidator()),
      platformId: new FormControl('0', categoryValidator()),
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, [Validators.required, Validators.max(300), Validators.min(1)]),
      details: new FormControl(null, [Validators.required, Validators.maxLength(520), Validators.minLength(30)]),
    });
    setTimeout(() => {
      this.updateForm.controls["categoryId"].setValue(this.movies.categoryName),
        this.updateForm.controls["platformId"].setValue(this.movies.platformName)
    }, 200)
  }

  ngOnInit(): void {
    this.getPlatform();
    this.getMovieById();
    this.getCategory();
  }

  getCategory() {
    return this.categoryService.getCategoryEnumValues(false).then(categoryData => {
      this.categoryEnum = categoryData;
    })
  }

  getPlatform() {
    return this.platformService.getPlatformEnumValues(false).then(platformData => {
      this.platformEnum = platformData
    })
  }

  getMovieById() {
    const params = this.route.snapshot.params;
    this.movieService.getMovieById(params['id']).then((movieData: Partial<List_Movie | string>) => {
      if (movieData) {
        this.movies = movieData as List_Movie;
        this.movieId = params['id'];
      }
    });
  }

  isValid(formControlName: string) {
    const formControl = this.updateForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched || formControl?.dirty);
  }

  isValidTemplate(formControlName: string): boolean {
    const formControl = this.updateForm.get(formControlName);

    if (formControl?.invalid && (formControl.touched || formControl?.dirty))
      if (formControl.errors?.['required'] || formControl.errors?.['minlength']
        || formControl.errors?.['maxlength'] || formControl.errors?.['max'] || formControl.errors?.['min'])
        return true;

    return false;
  }

  update(movieId: number) {
    if (!this.updateForm.valid) {
      return;
    }

    const formData = this.updateForm.value;

    const selectedCategory = this.categoryEnum.find(item => item.description === formData.categoryId);
    const categoryId = selectedCategory ? selectedCategory.value : 0;

    const selectedPlatform = this.platformEnum.find(item => item.description === formData.platformId);
    const platformId = selectedPlatform ? selectedPlatform.value : 0;

    const movie: Update_Movie = {
      id: movieId,
      name: formData.name,
      categoryId: categoryId,
      platformId: platformId,
      releaseDate: new Date(formData.date),
      movieTime: formData.time,
      description: formData.details,
    };

    this.movieService.updateMovie(movie, async () => {
      const result = await this.sweetAlertService.showAlert(SweetMovie.updateMovie);
      if (result.dismiss) {
        setTimeout(() => {
          this.router.navigate(['/Admin', 'Movies-List']);
        }, 1000)
      }
    });
  }
}
