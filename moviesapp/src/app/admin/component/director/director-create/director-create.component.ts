import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { List_Director } from 'src/app/contracts/director/list-director';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { DirectorService } from 'src/app/services/common/models/director.service';

@Component({
  selector: 'app-director-create',
  templateUrl: './director-create.component.html',
  styleUrls: ['./director-create.component.css']
})
export class DirectorCreateComponent implements OnInit {
  createForm: FormGroup;
  movieId: string;
  directorValue: string = '';
  directorNames: string[] = []; 
  director: List_Director[];
  constructor(private directorService: DirectorService, private fb: FormBuilder,private activatedRoute: ActivatedRoute) {
    this.createForm = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl(''),
    });
  }
  
  ngOnInit(): void {
    this.getDirector();
  }
  getDirector(){
    this.activatedRoute.params.subscribe(async (params) => {
      const playerData: Partial<List_Director> = await this.directorService.getPlayerId(params['id']);
      if (playerData) {
        this.director = playerData as List_Director[];
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
        movieId: formData.id,
        directorNames: name
      }));
      for (const director of directors) {
        this.directorService.post(director, this.movieId,director.directorNames );
      }
    }
  }
  removeDirector(id:string){
    this.directorService.delete(id).then(()=>{
      this.getDirector();
    })
  }
  removeCreate(index: number) {
       this.directorNames.splice(index, 1);
     }
}
