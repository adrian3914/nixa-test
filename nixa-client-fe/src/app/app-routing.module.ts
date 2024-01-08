import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FetchAllComponent} from "./components/fetch-all/fetch-all.component";
import {AddNewComponent} from "./components/add-new/add-new.component";
import {FetchByIdComponent} from "./components/fetch-by-id/fetch-by-id.component";
import {UpdateComponent} from "./components/update/update.component";

const routes: Routes = [
  {
    path: '',
    component: FetchAllComponent
  }, {
    path: 'fetch-all',
    component: FetchAllComponent
  },
  {
    path: 'fetch-by-id',
    component: FetchByIdComponent
  },
  {
    path: 'add-new',
    component: AddNewComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  }
  ,
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
