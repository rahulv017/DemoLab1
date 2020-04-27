import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabUser } from './lab-user';
import { RackEnterComponent } from './rack-enter/rack-enter.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CellData } from './CellData';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RackSample } from './rack-sample';
import { RackServiceService } from './rack-service.service';
import { MatButtonModule } from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatTableModule} from '@angular/material/table';
import { BackgroundComponent } from './background/background.component';
import {RouterModule, Routes} from "@angular/router";
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { MatSortModule } from '@angular/material/sort';

const appRoutes: Routes = [
  { path: '', component: RackEnterComponent, data: { title: 'RackEnter Component' } },
  { path: 'rack-enter', component: RackEnterComponent, data: { title: 'RackEnter Component' } },
  { path: 'pending-request', component: PendingRequestComponent, data: { title: 'PendingReuest Component' } },
];

@NgModule({
  declarations: [
    AppComponent,
    RackEnterComponent,
    BackgroundComponent,
    PendingRequestComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
   MatNativeDateModule,
   MatListModule,
   MatIconModule,
   MatMenuModule,
   MatFormFieldModule,
   MatInputModule,
   MatCardModule,
   MatTableModule,
   MatSortModule,
   RouterModule.forRoot(
    appRoutes,
    { useHash: true }
  )


    
  ],
  providers: [LabUser,CellData,RackSample],
  bootstrap: [AppComponent]
})
export class AppModule { }
