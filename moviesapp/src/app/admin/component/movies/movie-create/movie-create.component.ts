import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { ListCategoryEnum, CategoryEnum } from 'src/app/enums/category-enum';
import { ListPlatformEnum, PlatformEnum } from 'src/app/enums/platform-enum';
import { SpinnerType } from 'src/app/enums/spinner-enum';
import { SweetHttpError } from 'src/app/internal/sweet-message/http-error';
import { SweetMovie } from 'src/app/internal/sweet-message/movie';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { dateFormatValidator } from 'src/app/shared/validators/date.validator';
import { categoryValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent extends BaseComponent implements OnInit {
  createForm: FormGroup;
  model: Create_Movie = {} as Create_Movie;
  categoryEnum: { value: CategoryEnum; description: string; }[];
  platformEnum: { value: PlatformEnum; description: string; }[];
  categories: ListCategoryEnum;
  platform: ListPlatformEnum;
  constructor(
    private fb: FormBuilder, private movieService: MoviesService, private sweetAlertService: SweetalertService,
    private router: Router, spinner: NgxSpinnerService) {
    super(spinner);
    this.categories = new ListCategoryEnum();
    this.platform = new ListPlatformEnum();

    this.createForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0', categoryValidator()),
      platformId: new FormControl('0', categoryValidator()),
      date: new FormControl(null, [Validators.required,dateFormatValidator]),
      time: new FormControl(null, [Validators.required, Validators.max(300), Validators.min(1)]),
      detail: new FormControl(null, [Validators.required, Validators.maxLength(520), Validators.minLength(30)]),
    });
  }

  ngOnInit(): void {
    this.getCategory();
    this.getPlatform();
  }
  getCategory() {
    this.categories.getCategoryEnumValues().then(categoryData => {
      this.categoryEnum = categoryData;
    });
  }

  getPlatform() {
    this.platform.getPlatformEnumValues().then(platformData => {
      this.platformEnum = platformData;
    });
  }

  isValid(formControlName: string) {
    const formControl = this.createForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }

  isValidTemplate(formControlName: string): boolean {
    const formControl = this.createForm.get(formControlName);

    if (formControl?.invalid && (formControl.touched))
      if (formControl.errors?.['required'] || formControl.errors?.['minlength']
        || formControl.errors?.['maxlength'] || formControl.errors?.['max'] || formControl.errors?.['min'])
        return true;

    return false;
  }

  create() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const movie: Create_Movie = {
        name: formData.name,
        categoryId: formData.categoryId,
        platformId: formData.platformId,
        releaseDate: new Date(formData.date),
        movieTime: formData.time,
        description: formData.detail,
      };
      this.movieService.createMovie(movie, async () => {

        const result = await this.sweetAlertService.showAlert(SweetMovie.createsMovie);
        if (result.dismiss) {
          this.router.navigate(['/Admin', 'Movies-List']);
        }
      }, error => {
        this.sweetAlertService.showAlert(SweetHttpError.serverError);
      });
    }
  }
}
