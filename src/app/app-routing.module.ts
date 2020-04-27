import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RackEnterComponent } from './rack-enter/rack-enter.component';


const routes: Routes = [

  {path:'rackDetails',component:RackEnterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
