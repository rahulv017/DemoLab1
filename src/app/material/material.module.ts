import { NgModule } from '@angular/core';
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



const material=[
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
  MatTableModule


]

@NgModule({
  imports: [material] ,
  exports: [material]
})
export class MaterialModule {
  
 }
