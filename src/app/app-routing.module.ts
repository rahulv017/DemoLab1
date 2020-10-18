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
import { FirstComponent } from './first/first.component';
import { FilteringComponent } from './filtering/filtering.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponentComponent } from './fourth-component/fourth-component.component';
import { ViewLabReportComponent } from './view-lab-report/view-lab-report.component';
import { DecideDeepTestComponent } from './decide-deep-test/decide-deep-test.component';
import { UpdateBriefComponent } from './update-brief/update-brief.component';
import {SignUpComponent} from './sign-up/sign-up.component';


const routes: Routes = [
  { path: 'signUp', component:SignUpComponent},
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
  {path:'PBMC',component:PBMCLABComponent, canActivate:[AuthGaurdService]},
  { path: 'first', component: FirstComponent, data: { title: 'First Component' }, canActivate:[AuthGaurdService] },
  { path: 'filter', component: FilteringComponent, data: { title: 'Filtering Component'},canActivate:[AuthGaurdService] },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' },canActivate:[AuthGaurdService] },
  {path: 'breifView/:id',component:FourthComponentComponent,canActivate:[AuthGaurdService]},
  {path: 'labView',component:ViewLabReportComponent,canActivate:[AuthGaurdService]},
  {path: 'DecideDeep',component:DecideDeepTestComponent,canActivate:[AuthGaurdService]},
  {path: 'updateDetails', component:UpdateBriefComponent,canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
