export class List {
}
  // create() {
  //   if (this.createForm.valid) {
  //     const formData = this.createForm.value;
  //     const newActors = formData.actor.split(',').map((actor: string) => actor.trim());
  //     const newDirectors = formData.director.split(',').map((director: string) => director.trim());

  //     const movie: Movie = {
  //       id: formData.id,
  //       movieName: formData.name,
  //       categoryId: formData.categoryId,
  //       platformId: formData.platformId,
  //       movieActors: this.model.movieActors.concat(newActors.filter(Boolean)),
  //       movieDirectors: this.model.movieDirectors.concat(newDirectors.filter(Boolean)),
  //       movieDetails: formData.detail,
  //     };

  //     this.AdminService.AdminMoviePost(movie).subscribe((data) => {
  //       console.log(data);
  //     });
  //   }
  // }