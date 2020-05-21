import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnterSampleComponent } from '../enter-sample/enter-sample.component';
import { FreezerData } from '../freezer-data';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-freeze-eighty',
  templateUrl: './freeze-eighty.component.html',
  styleUrls: ['./freeze-eighty.component.css']
})
export class FreezeEightyComponent implements OnInit {

  displayedColumns: string[] = [ 'Box', 'Cell','Sample','Lab','Remove','Add'];
  dataSource:MatTableDataSource<FreezerData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;
  boxfilter = new FormControl('');
  cellfilter = new FormControl('');
  samplefilter=new FormControl('');
  //globalFilter = '';
  filteredValues = {
    boxId: '', cellId: '', sampleNo: '',
    labName: ''
  };
  constructor(public service:RackServiceService,public router:Router,public dialog: MatDialog) { }
  ngOnInit() {
    this.service.getAllFrezeerEightyData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    
    this.dataSource = new MatTableDataSource<FreezerData>(response);
    this.dataSource.paginator = this.paginator;
    this.boxfilter.valueChanges.subscribe((boxFilterValue) => {
      this.filteredValues['boxId'] = boxFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.cellfilter.valueChanges.subscribe((cellFilterValue) => {
      this.filteredValues['cellId'] = cellFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.samplefilter.valueChanges.subscribe((sampleFilterValue) => {
      this.filteredValues['sampleNo'] = sampleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  onEdit(data:FreezerData)
  {
    let message=confirm("This operation is irreversible.Click OK to continue");
    if(message)
    {
      data.labName="";
      data.sampleNo=0;
      this.dataSource.paginator = this.paginator;
      this.service.removeFridge80Entry(data).subscribe();
      alert("Deleted!!");
    }

  }

  onAdd(element:FreezerData)
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
      this.service.sendFrezerEightyData(element).subscribe();
      }
    });
  }

   // this.service.sendRackData(data);
     // this.router.navigate(['/enterSample']);
  
    
  onSave()
  {

  }

  // applyFilter(filtervalue: string){
  //   this.dataSource.filter= filtervalue.trim().toLowerCase();

  //   this.dataSource.filterPredicate = function(data, filter: string): boolean {
  //     return data.id.boxId.toLowerCase().includes(filter) || data.id.cellId.toString().includes(filter) || data.labName.toLowerCase().includes(filter) 
  //     || data.sampleNo.toString().includes(filter);
  //     }
  // }
  /*applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }*/


  customFilterPredicate() {
    const myFilterPredicate = (data: FreezerData, filter: string): boolean => {
     // var globalMatch = !this.globalFilter;

     // if (this.globalFilter) {
        // search all text fields
      //  globalMatch = data.id.boxId.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      //}

      //if (!globalMatch) {
     //   return;
     // }

      let searchString = JSON.parse(filter);
      return data.id.cellId.toString().trim().indexOf(searchString.cellId) !== -1 &&
        data.id.boxId.toString().trim().toLowerCase().indexOf(searchString.boxId.toLowerCase()) !== -1 
        && data.sampleNo.toString().trim().indexOf(searchString.sampleNo) !== -1;
    }
    return myFilterPredicate;
  }

}
