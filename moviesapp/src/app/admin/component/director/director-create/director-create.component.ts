import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  movie: List_Movie;
  movieId: string;
  directorValue: string = '';
  directorNames: string[] = []; 

  constructor(
    private directorService: DirectorService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService
  ) {
    this.createForm = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl(''),
    });
  }
  
  ngOnInit(): void {
    this.getMoviesId();
  }
  
  getMoviesId() {
    this.activatedRoute.params.subscribe(async (params) => {
      const movieData: Partial<List_Movie> = await this.movieService.getMovieId(params['id']);
      if (movieData) {
        this.movie = movieData as List_Movie;
        this.movieId = params['id']; 
      }
    });
  }
  
  addDirector(event: any) {
    event.preventDefault();
    if (this.directorValue.trim() !== '') {
      this.directorNames.push(this.directorValue.trim()); 
      this.directorValue = '';
    }
  }
  create() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const directors: Create_Director[] = this.directorNames.map(name => ({
        movieId: formData.movieId,
        directorNames: name
      }));
      for (const director of directors) {
        this.directorService.post(director, this.movieId,director.directorNames );
      }
    }
  }
  removeDirector(index: number) {
       this.directorNames.splice(index, 1);
     }
}
