import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { RackInformationComponent } from './rack-information/rack-information.component';
import { EnterSampleComponent } from './enter-sample/enter-sample.component';
import { FreezeTwentyComponent } from './freeze-twenty/freeze-twenty.component';
import { FreezeEightyComponent } from './freeze-eighty/freeze-eighty.component';
import { DNALABComponent } from './dnalab/dnalab.component';
import { MycoplasmaLabComponent } from './mycoplasma-lab/mycoplasma-lab.component';
import { GeneprintLabComponent } from './geneprint-lab/geneprint-lab.component';
import { KarotypingComponent } from './karotyping/karotyping.component';
import { PBMCLABComponent } from './pbmclab/pbmclab.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { BackgroundComponent } from './background/background.component';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'RackInformation', component: RackInformationComponent,canActivate:[AuthGaurdService]},
  { path: 'pending-request', component: PendingRequestComponent,canActivate:[AuthGaurdService]},
  {path:'logout',component: LogoutComponent, canActivate:[AuthGaurdService]},
  {path:'Dashboard',component:DashboardComponent, canActivate:[AuthGaurdService]},
  {path:'RackDashboard',component:RackInformationComponent, canActivate:[AuthGaurdService]},
  {path:'enterSample',component:EnterSampleComponent, canActivate:[AuthGaurdService]},
  {path:'Fridge(-20)',component:FreezeTwentyComponent, canActivate:[AuthGaurdService]},
  {path:'Fridge(-80)',component:FreezeEightyComponent, canActivate:[AuthGaurdService]},
  {path:'DNA',component:DNALABComponent, canActivate:[AuthGaurdService]},
  {path:'Mycoplasma',component:MycoplasmaLabComponent, canActivate:[AuthGaurdService]},
  {path:'Geneprint',component:GeneprintLabComponent, canActivate:[AuthGaurdService]},
  {path:'Karotyping',component:KarotypingComponent, canActivate:[AuthGaurdService]},
  {path:'PBMC',component:PBMCLABComponent, canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
