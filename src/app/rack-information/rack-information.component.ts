import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnterSampleComponent } from '../enter-sample/enter-sample.component';
import { TableUtil } from "../tableUtil";
import * as XLSX from "xlsx";

export interface Lab{
  lab:string;
  sample:number;
}
@Component({
  selector: 'app-rack-information',
  templateUrl: './rack-information.component.html',
  styleUrls: ['./rack-information.component.css']
})
export class RackInformationComponent implements OnInit {

  displayedColumns: string[] = ['Canister', 'Rack', 'Box', 'Cell','Sample','Lab','Remove','Add'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;

  constructor(public service:RackServiceService,public router:Router,public dialog: MatDialog) 
  {}
  
  ngOnInit() {
   // this.service.authenticate().subscribe(response => this.service.JWT = response);
    this.service.getAllRackData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    
    this.dataSource = new MatTableDataSource<RackSample>(response);
    this.dataSource.paginator = this.paginator;
  }

  exportTable() {
    TableUtil.exportTableToExcel("Exportrack");
  }

  onEdit(data:RackSample)
  {
     data.labName="";
     data.sampleNo=0;
     this.dataSource.paginator = this.paginator;

  }

  onAdd(element:RackSample)
  {
    const dialogRef = this.dialog.open(EnterSampleComponent, {
      width: '250px',
      data: {data:element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result===false)
      {
           console.log("Enterd false");
      }
      else
      {

      
      element.labName = result.lab;
      element.sampleNo=result.sample;
      console.log(element);
      this.service.sendRackData(element).subscribe();
      }
    });
  }

   // this.service.sendRackData(data);
     // this.router.navigate(['/enterSample']);
  
    
  onSave()
  {

  }

  applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELE: RackSample[]=[
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123},
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123},
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123},
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123}
]
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

 


