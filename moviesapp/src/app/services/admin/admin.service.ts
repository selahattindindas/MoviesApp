import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from 'src/app/entities/movie';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/Category';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/Platform';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    @Inject('backend_url') private baseUrl: string
  ) {}

  getMovies(categoryId: number, platformId: number): Observable<Movie[]> {
    return this.http.get<{ [key: number]: Movie }>(`${this.baseUrl}/movie`).pipe(
      map(response => {
        const movies: Movie[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const movie = response[key];
            movie.id = parseInt(key, 10); 
            movies.push(movie);
          }
        }
        return movies.filter(
          movie =>
            (!categoryId || movie.categoryId === categoryId) &&
            (!platformId || movie.platformId === platformId)
        );
      })
    );
  }
}

