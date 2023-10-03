import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { DirectorService } from 'src/app/services/common/models/director.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-director-create',
  templateUrl: './director-create.component.html',
  styleUrls: ['./director-create.component.css']
})
export class DirectorCreateComponent implements OnInit {
  createForm: FormGroup;
  model: Create_Director = {} as Create_Director;
  movies: List_Movie[];
  movieId: string;
  directorValue: string = '';
  constructor(
    private directorService: DirectorService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService
  ) {
    this.createForm = this.fb.group({
      id: new FormControl('', Validators.required),
      Name: new FormControl(''),
    });
    this.model.directorNames = [];
  }
  
  ngOnInit(): void {
    this.getMovie();
  }

  async getMovie() {
    const movieData: Partial<List_Movie[]> = await this.movieService.get();
    if (movieData) {
      this.movies = movieData as List_Movie[];
    }
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.movieId = idParam;
      }
    });
  }
  create() {
    if (this.createForm.valid) { 
      const formData = this.createForm.value;
      this.model.directorNames.push(formData.Name);
      const director: Create_Director = {
        id: formData.id,
        directorNames: this.model.directorNames 
      };
      this.directorService.post(director, formData.id, formData.Name);
    }
  }
  directorsCreate(directorValue: string) {
    if (directorValue !== '') {
      this.model.directorNames.push(directorValue);
      this.directorValue = '';
    }
  }
  removeDirector(index: number) {
    this.model.directorNames.splice(index, 1);
  }
}
