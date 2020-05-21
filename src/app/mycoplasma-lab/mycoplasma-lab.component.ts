import { Component, OnInit,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnterSampleComponent } from '../enter-sample/enter-sample.component';
import { FreezerData } from '../freezer-data';
import { DNAData } from '../dnadata';
import { EnterDNAComponent } from '../enter-dna/enter-dna.component';
import { EventEmitter } from 'protractor';
import { EnterMycoplasmaComponent } from '../enter-mycoplasma/enter-mycoplasma.component';
import { Mycoplasma } from '../mycoplasma';
import { TableUtil } from "../tableUtil";
import * as XLSX from "xlsx";
@Component({
  selector: 'app-mycoplasma-lab',
  templateUrl: './mycoplasma-lab.component.html',
  styleUrls: ['./mycoplasma-lab.component.css']
})
export class MycoplasmaLabComponent implements OnInit {
  displayedColumns: string[] = [ 'DNO', 'Sample','Date','doneby','Report','A','B','B/A','Machine','Edit'];
dataSource;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(public dialog: MatDialog,public service:RackServiceService) { 
    
  }

  ngOnInit() {
    this.service.getALLMycoplasmaData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    console.log(response);
    this.dataSource = new MatTableDataSource<Mycoplasma>(response);
    this.dataSource.paginator = this.paginator;
  }

  exportTable() {
    TableUtil.exportTableToExcel("Exportmycoplasma");
  }

  onEdit(element:Mycoplasma)
  {
    const dialogRef = this.dialog.open(EnterMycoplasmaComponent, {
      height:'600px',
      width: '600px',
      data:element
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if(data===false)
      {
           console.log("Enterd false");
      }
      else
      {
        element.date=data.date;
        element.a=data.a;
        element.b=data.b;
        element.bBya=data.bBya;
        element.user=data.user;
        element.result=data.result;
        element.machine=data.machine;
        element.passage=data.passage;
        element.status=data.status;
     //   element.catalogue=data.catalogue;
    //  console.log(data.totalVol);
      console.log(element);
     this.service.updateMycoplasma(element).subscribe();
      }
    });
  }
 
  applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();

    this.dataSource.filterPredicate = function(data:Mycoplasma, filter: string): boolean {
      if((data.id.sampleNo && data.id.sampleNo.toString().includes(filter) ) || (data.id.dNo && data.id.dNo.toLowerCase().includes(filter)) || (data.a && data.a.toLowerCase().includes(filter)) || (data.b && data.b.toLowerCase().includes(filter)) 
      || (data.bBya && data.bBya.toLowerCase().includes(filter)) || (data.user && data.user.toLowerCase().includes(filter)) || 
     (data.result && data.result.toLowerCase().includes(filter)) || (data.machine && data.machine.toLowerCase().includes(filter)) || (data.passage && data.passage.toLowerCase().includes(filter))
     || (data.date && data.date.toString().includes(filter)))
     return true;
     else
     return false;

  }

}
}
