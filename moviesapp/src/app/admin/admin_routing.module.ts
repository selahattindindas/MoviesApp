import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AdminhomeComponent } from "./component/adminhome/adminhome.component";
import { AdminNewListComponent } from "./component/admin-new-list/admin-new-list.component";
import { AdminlayoutComponent } from "./component/adminlayout/adminlayout.component";
import { MovieCreateComponent } from "./component/movies/create/create.component";
import { MovieListComponent } from "./component/movies/movie-list/movie-list.component";
import { UpdateComponent } from "./component/movies/update/update.component";
import { UserComponent } from "./component/user/user.component";
const route: Route[] = [
    {
      path: 'Admin',
      component: AdminlayoutComponent,
      children: [
        { path: '', component: AdminhomeComponent },
        { path: 'Movies-List', children: [
            { path: 'Edit/:id', component: UpdateComponent },
            { path: 'Create-Movie', component: MovieCreateComponent },
            { path: '', component: MovieListComponent }
        ] },
        { path: 'News', component: AdminNewListComponent },
        { path: 'Users', component: UserComponent }
      ]
    }
  ];
  

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule],
})
export class Admin_Routing{}