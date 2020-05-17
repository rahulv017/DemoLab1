import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnterSampleComponent } from '../enter-sample/enter-sample.component';
import { FreezerData } from '../freezer-data';
@Component({
  selector: 'app-freeze-twenty',
  templateUrl: './freeze-twenty.component.html',
  styleUrls: ['./freeze-twenty.component.css']
})
export class FreezeTwentyComponent implements OnInit {

   displayedColumns: string[] = [ 'Box', 'Cell','Sample','Lab','Remove','Add'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;

  constructor(public service:RackServiceService,public router:Router,public dialog: MatDialog) { }
  ngOnInit() {
    this.service.getAllFrezeerTwentyData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    
    this.dataSource = new MatTableDataSource<FreezerData>(response);
    this.dataSource.paginator = this.paginator;
  }
  onEdit(data:RackSample)
  {
     data.labName="";
     data.sampleNo=0;
     this.dataSource.paginator = this.paginator;

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
      this.service.sendFrezerTwentyData(element).subscribe();
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


