import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AbcComponent } from "./abc/abc.component";

const routes: Route[] = [
    {
      path: '',
      redirectTo: 'Tester',
      pathMatch: 'full'
    },
    {
      path: 'Tester',
      component: AbcComponent,
      children: [
        { path: '', component: AbcComponent },
      ],
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class UiTestRoutingModule {}