import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
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
  movie: Update_Movie;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private platformService: PlatformService,
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      Name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl('0'),
      platformId: new FormControl('0'),
      director: new FormControl(''),
      actor: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
      details: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.getCategory();
    this.getPlatform();
    this.getMovieById();
    this.updateId();
  }

  getCategory() {
    this.categoryEnum = this.categoryService.getCategoryEnumValues();
    this.categoryDescriptions = this.categoryService.getCategoryDescriptions();
    this.categoryEnum = this.categoryEnum.filter(
      (item) => item !== CategoryEnum.Seciniz
    );
  }
  getPlatform() {
    this.platformEnum = this.platformService.getPlatformEnumValues();
    this.platformDescriptions = this.platformService.getPlatformDescriptions();
    this.platformEnum = this.platformEnum.filter(
      (item) => item !== PlatformEnum.Seciniz
    );
  }
  getMovieById() {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      const movieData: Partial<Update_Movie> =
        await this.movieService.getMovieId(params['id']);
      if (movieData && movieData.name) this.movie = movieData as Update_Movie;
    });
  }
  updateId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.movieId = idParam !== null ? idParam : '';
    });
  }
  async update(movieId: string) {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      const movie: Create_Movie = {
        movieName: formData.Name,
        categoryId: formData.categoryId,
        platformId: formData.platformId,
        director: formData.director,
        releaseDate: new Date(formData.date),
        movieTime: new Date(formData.time),
        description: formData.details,
      };
      await this.movieService.updateMovie(movie, movieId);
    }
  }

  //  directorsCreate(directorValue: string) {
  //    if (directorValue !== '') {
  //     const director: Director = {
  //       id: ++this.lastDirectorId,
  //        movieId: ++this.lastDirectorId,
  //       name: directorValue,
  //      };
  //  //    this.model.director.push(director);
  //      this.directorValue = '';
  //   }
  //  }
  //  actorsCreate(actorValue: string) {
  //    if (actorValue !== '') {
  //      const actor: Actor = {
  //      id: ++this.lastDirectorId,
  //      movieId: ++this.lastDirectorId,
  //       name: actorValue,
  //     };
  //     this.model.actor.push(actor);
  //      this.actorValue = '';
  //    }
  //  }
  //  removeActor(index: number) {
  //    this.model.actor.splice(index, 1);
  //  }
  // removeDirector(index: number) {
  //   this.model.director.splice(index, 1);
  // }
}
