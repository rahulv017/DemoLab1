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
import { EnterPBMCComponent } from '../enter-pbmc/enter-pbmc.component';
import { PBMCDATA } from '../pbmcdata';


@Component({
  selector: 'app-pbmclab',
  templateUrl: './pbmclab.component.html',
  styleUrls: ['./pbmclab.component.css']
})
export class PBMCLABComponent implements OnInit {

  displayedColumns: string[] = [ 'DNO', 'Sample','CellTrack','Mirror','DateC','DateP','doneBy','BloodFreeze','DNA','totalSample','Remarks','Cryo','Edit'];
dataSource;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(public dialog: MatDialog,public service:RackServiceService) { 
    
  }

  ngOnInit() {
    this.service.getALLPBMCData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    console.log(response);
    this.dataSource = new MatTableDataSource<Mycoplasma>(response);
    this.dataSource.paginator = this.paginator;
  }

  exportTable() {
    TableUtil.exportTableToExcel("ExportPBMC");
  }

  onDNA(element)
  {

  }

  onCellTrack(element)
  {

  }

  onMirror(element)
  {

  }

  onCyro(element)
  {
    
  }

  onBloodFreeze(element)
  {

  }

  onEdit(element:PBMCDATA)
  {
    const dialogRef = this.dialog.open(EnterPBMCComponent, {
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
        element.dateC=data.dateC;
        element.dateP=data.dateP;
        element.count=data.count;
        element.doneBy=data.doneBy;
        element.remarks=data.remarks;
        element.status=data.status;
       
     //   element.catalogue=data.catalogue;
    //  console.log(data.totalVol);
      console.log(element);
     this.service.sendPBMCData(element).subscribe();
      }
    });
  }

  applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      if((data.id.sampleNo && data.id.sampleNo.toString().includes(filter))  || (data.id.dNo && data.id.dNo.toLowerCase().includes(filter)) || (data.doneBy && data.doneBy.toLowerCase().includes(filter))
       || (data.count && data.count.toLowerCase().includes(filter)) 
      || (data.remarks && data.remarks.toLowerCase().includes(filter)) ||(data.dateP && data.dateP.toString().includes(filter))
     || (data.dateC && data.dateC.toString().includes(filter)))
     return true;
     else
     return false;

  }

  }

}
