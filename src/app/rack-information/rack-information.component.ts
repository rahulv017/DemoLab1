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
import { FormControl } from '@angular/forms';

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

  boxfilter = new FormControl('');
  rackfilter = new FormControl('');
  samplefilter=new FormControl('');
  canisterfilter=new FormControl('');
  //globalFilter = '';
  filteredValues = {
    canId:'',rackId: '', boxId: '',cellId:'', sampleNo: '',
    labName: ''
  };


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
    this.boxfilter.valueChanges.subscribe((boxFilterValue) => {
      this.filteredValues['boxId'] = boxFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.rackfilter.valueChanges.subscribe((cellFilterValue) => {
      this.filteredValues['rackId'] = cellFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.canisterfilter.valueChanges.subscribe((cellFilterValue) => {
      this.filteredValues['canId'] = cellFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.samplefilter.valueChanges.subscribe((sampleFilterValue) => {
      this.filteredValues['sampleNo'] = sampleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
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
  
    


     customFilterPredicate() {
      const myFilterPredicate = (data: RackSample, filter: string): boolean => {
        // var globalMatch = !this.globalFilter;
  
        // if (this.globalFilter) {
        //   // search all text fields
        //   globalMatch = data.id.boxId.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
        // }
  
        // if (!globalMatch) {
        //   return;
        // }
  
        let searchString = JSON.parse(filter);
         if((data.id.canId && data.id.canId.toString().trim().toLowerCase().indexOf(searchString.canId.toLowerCase()) !== -1) &&
          (data.id.boxId && data.id.boxId.toString().trim().toLowerCase().indexOf(searchString.boxId.toLowerCase()) !== -1) 
          && (data.sampleNo&& data.sampleNo.toString().trim().indexOf(searchString.sampleNo) !== -1) && (data.id.rackId && data.id.rackId.toString().trim().toLowerCase().indexOf(searchString.rackId.toLowerCase()) !== -1))
          return true;
          else return false;
      }
      return myFilterPredicate;
    }
  onSave()
  {

  }

  /*applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.sampleNo.toString().includes(filter)  || data.id.canId.toLowerCase().includes(filter) || data.id.boxId.toLowerCase().includes(filter) 
      || data.id.rackId.toLowerCase().includes(filter) 
      || data.cellId.toString().includes(filter) || data.labName.toLowerCase().includes(filter);

  }

  }*/

}

const ELE: RackSample[]=[
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123},
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123},
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123},
  {id:{canId:"C1",boxId:"B1",rackId:"R1",cellId:1},labName:"PBMC",sampleNo:123}
]


 


