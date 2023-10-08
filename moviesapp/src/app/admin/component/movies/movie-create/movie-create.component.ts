import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit {
  createForm: FormGroup;
  model: Create_Movie = {} as Create_Movie;
  categoryEnum: { value: CategoryEnum; description: string; }[];
  platformEnum:{ value: PlatformEnum; description: string; }[];
  
  constructor( 
    private fb: FormBuilder, private categoryService: CategoryService, private platformService: PlatformService,private movieService: MoviesService) 
    {
    this.createForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0'),
      platformId: new FormControl('0'),
      date: new FormControl(''),
      time: new FormControl(''),
      detail: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategory();
    this.getPlatform();
  }

  getCategory() {
    return this.categoryService.getCategoryEnumValues(CategoryEnum.Seciniz.toString()).then(categorData=>{
      this.categoryEnum = categorData;
    })
  }

  getPlatform() {
    return this.platformService.getPlatformEnumValues(PlatformEnum.Seciniz.toString()).then(platformData =>{
      this.platformEnum = platformData
    })
  }

  create() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const movie: Create_Movie = {
        name: formData.nyame,
        categoryId: formData.categoryId,
        platformId: formData.platformId,
        releaseDate: new Date(formData.date),
        movieTime: formData.time,
        description: formData.detail,
      };
      this.movieService.createMovie(movie);
    }
  }
}
