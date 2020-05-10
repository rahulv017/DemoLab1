import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RackEnterComponent } from './rack-enter/rack-enter.component';
import { EnterLabDataComponent } from './enter-lab-data/enter-lab-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RackInformationComponent } from './rack-information/rack-information.component';
import { EnterSampleComponent } from './enter-sample/enter-sample.component';
import { FreezeTwentyComponent } from './freeze-twenty/freeze-twenty.component';
import { FreezeEightyComponent } from './freeze-eighty/freeze-eighty.component';


const routes: Routes = [

  {path:'rackDetails',component:RackEnterComponent},
  {path:'enterLab',component:EnterLabDataComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'RackDashboard',component:RackInformationComponent},
  {path:'enterSample',component:EnterSampleComponent},
  {path:'Fridge(-20)',component:FreezeTwentyComponent},
  {path:'Fridge(-80)',component:FreezeEightyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
