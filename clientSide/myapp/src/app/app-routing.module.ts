import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddRecordComponent} from "./add-record/add-record.component";
import { RegisteredUsersComponent} from "./registered-users/registered-users.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AppComponent} from "./app.component";
const routes: Routes = [

  {path: '' , redirectTo:'record',pathMatch:'full'},
  {path: 'addRecord', component: AddRecordComponent},
  {path: 'record', component: RegisteredUsersComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
