
import { Pipe, PipeTransform } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';

@Pipe({
    name: 'dateMovieFilter',
})
export class DateMovieFilterPipe implements PipeTransform {
    transform<T extends { releaseDate: string }>(items: T[] | undefined, category: string): Array<T & { category: string; }> {
        if (!items || !Array.isArray(items)) {
            return [];
        }
        const currentDate = new Date();
        const movieVisionDate = new Date(currentDate);
        movieVisionDate.setDate(movieVisionDate.getDate() + 42);

        return items.filter(movie => {

            const [day, month, year] = movie.releaseDate.split('.').map(Number);
            const movieDate = new Date(year, month - 1, day);

            if (category === 'pastMovies' && movieDate < currentDate) {
                return true;
            } else if (category === 'upcomingMovies' && movieDate > movieVisionDate) {
                return true;
            } else if (category === 'visionMovies' && movieDate >= currentDate && movieDate <= movieVisionDate) {
                return true;
            }

            return false;
        }).map(movie => ({ ...movie, category }));
    }
}