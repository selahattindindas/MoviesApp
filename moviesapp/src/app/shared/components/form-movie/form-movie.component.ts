import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dateFormatValidator } from '../../validators/date.validator';
import { categoryValidator } from '../../validators/required.validator';
import { CategoryEnum, ListCategoryEnum } from 'src/app/constacts/category-enum';
import { PlatformEnum, ListPlatformEnum } from 'src/app/constacts/platform-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent<T> implements OnInit, OnChanges {
  @Input() headerTitle: string = '';
  @Input() buttonTitle: string = '';
  @Output() itemSubmit = new EventEmitter<T>();
  @Input() movies: List_Movie;
  movieForm: FormGroup;
  categoryEnum: { value: CategoryEnum; description: string; }[];
  platformEnum: { value: PlatformEnum; description: string; }[];
  categories: ListCategoryEnum;
  platform: ListPlatformEnum;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0', categoryValidator()),
      platformId: new FormControl('0', categoryValidator()),
      releaseDate: new FormControl(null, [Validators.required, dateFormatValidator]),
      movieTime: new FormControl(null, [Validators.required, Validators.max(300), Validators.min(1)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(4096), Validators.minLength(30)]),
    });

    this.categories = new ListCategoryEnum();
    this.platform = new ListPlatformEnum();
  }

  ngOnInit(): void {
    this.getCategory();
    this.getPlatform();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && this.movies) {
      this.isEditMode = true;
      this.getCategory();
      this.getPlatform();
      this.getValue();
    }
  }

  getCategory() {
    const isCreateMode = !this.isEditMode;
    this.categories.getCategoryEnumValues(isCreateMode).then(categoryData => {
      this.categoryEnum = categoryData;
    });
  }

  getPlatform() {
    const isCreateMode = !this.isEditMode;
    this.platform.getPlatformEnumValues(isCreateMode).then(platformData => {
      this.platformEnum = platformData;
    });
  }

  getValue() {
    let releaseDate: string;
    if (this.movies.releaseDate) {
      const [day, month, year] = this.movies.releaseDate.split('.');
      releaseDate = `${year}-${month}-${day}`;
    }

    const selectedPlatform = this.platformEnum.find(platform => platform.description === this.movies.platformName);
    const selectedCategory = this.categoryEnum.find(category => category.description === this.movies.categoryName);

    this.movieForm.patchValue({
      name: this.movies.name,
      categoryId: selectedCategory ? selectedCategory.value : null,
      platformId: selectedPlatform ? selectedPlatform.value : null,
      releaseDate: releaseDate,
      movieTime: this.movies.movieTime,
      description: this.movies.description
    });
  }

  onSubmit() {
    if (!this.movieForm.valid) 
      return;

    const formData = this.movieForm.value;
 
    const formattedData = {
      ...formData,
      releaseDate: new Date(formData.releaseDate),
      movieTime: formData.movieTime ? formData.movieTime.toString() : null
    };

    this.itemSubmit.emit(formattedData);
  }

  isValid(formControlName: string) {
    const formControl = this.movieForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }

  isValidTemplate(formControlName: string): boolean {
    const formControl = this.movieForm.get(formControlName);

    if (formControl?.invalid && (formControl.touched))
      if (formControl.errors?.['required'] || formControl.errors?.['minlength']
        || formControl.errors?.['maxlength'] || formControl.errors?.['max'] || formControl.errors?.['min'])
        return true;

    return false;
  }
}
