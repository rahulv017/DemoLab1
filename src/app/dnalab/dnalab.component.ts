
import { Component, OnInit,ViewChild, Output } from '@angular/core';
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
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { PlasmaSerum } from '../plasma-serum';
import { TableUtil } from "../tableUtil";
import * as XLSX from "xlsx";
@Component({
  selector: 'app-dnalab',
  templateUrl: './dnalab.component.html',
  styleUrls: ['./dnalab.component.css']
})
export class DNALABComponent implements OnInit {

  displayedColumns: string[] = [ 'DNO', 'Sample','Date','Location','DoneBy','Conc','Total','A260',
                                    'A280','260/280','260/230','Catalogue','Edit'];
  dataSource;
  displayedColumnsPlasma: string[]= ['DNO','Sample','Plasma','Serum'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;
  labs=['gDNA(LCL)','gDNA(Blood)','Plasma Serum'];
  fav_lab=this.labs[0];

  constructor(public service:RackServiceService,public router:Router,public dialog: MatDialog) { }
  ngOnInit() {
    
    this.service.getALLDNALCLData().subscribe(response => this.fetchData(response));
    
    
  }

  onChange($event:MatRadioChange)
  {
    console.log(`You changed selection to ${ $event.value}`);
    if($event.value==this.labs[0])
    {
      this.service.getALLDNALCLData().subscribe(response => this.fetchData(response));
    }
    else if($event.value==this.labs[1])
    {
      this.service.getALLDNABloodData().subscribe(response => this.fetchData(response));
    }
    else if($event.value==this.labs[2])
    {
      this.service.getALLDNAPlasmaData().subscribe(response => this.fetchDataP(response));
    }
    
  }

  fetchData(response)
  {
    
    this.dataSource = new MatTableDataSource<DNAData>(response);
    this.dataSource.paginator = this.paginator;
    
  }

  fetchDataP(response)
  {
    
    this.dataSource = new MatTableDataSource<PlasmaSerum>(response);
    this.dataSource.paginator = this.paginator;
    
  }

  exportTable() {
    TableUtil.exportTableToExcel("Exportdna");
  }

  onEdit(data:RackSample)
  {
     data.labName="";
     data.sampleNo=0;
     this.dataSource.paginator = this.paginator;

  }

  onAddLCL(element:DNAData)
  {
    const dialogRef = this.dialog.open(EnterDNAComponent, {
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
        element.doneBy=data.doneBy;
        element.conc=data.conc;
        element.totalVol=data.totalVol;
        element.a260=data.a260;
        element.a280=data.a280;
        element.a260By330=data.a260By330;
        element.a260By280=data.a260By280;
        element.catalogue=data.catalogue;
      console.log(data.totalVol);
      console.log(element);
     this.service.sendDNALCLData(element).subscribe();
      }
    });
  }


  onAddBlood(element:DNAData)
  {
    const dialogRef = this.dialog.open(EnterDNAComponent, {
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
        element.doneBy=data.doneBy;
        element.conc=data.conc;
        element.totalVol=data.totalVol;
        element.a260=data.a260;
        element.a280=data.a280;
        element.a260By330=data.a260By330;
        element.a260By280=data.a260By280;
        element.catalogue=data.catalogue;
      console.log(data.totalVol);
      console.log(element);
     this.service.sendDNABloodData(element).subscribe();
      }
    });
  }

   // this.service.sendRackData(data);
     // this.router.navigate(['/enterSample']);
  
    
  onSearchSampleLCL(data:DNAData)
  {
    let JsonData={"id":data.id,"lab":"gDNA(LCL)"};
        
    this.service.fetchFridge80(JsonData).subscribe(response => alert(response.toString()));
  }

  onSearchSampleBlood(data:DNAData)
  {
        let JsonData={"id":data.id,"lab":"gDNA(blood)"};
        this.service.fetchFridge20(JsonData).subscribe(response => alert(response.toString()));
  }

  onPlasma(data)
  {
    let JsonData={"id":data.id,"lab":"Plasma"};
        
    this.service.fetchFridge80(JsonData).subscribe(response => alert(response.toString()));
  }

  onSerum(data)
  {
    let JsonData={"id":data.id,"lab":"Serum"};
        
    this.service.fetchFridge80(JsonData).subscribe(response => alert(response.toString()));
  }

}

const ELE:DNAData[]=[
  {id:{dNo:"D256",sampleNo:14256},date:new Date(),doneBy:"SN",conc:"12",totalVol:"12",a260:"1.2",a280:"1.3",a260By330:"1.3",
      a260By280:"1.40",catalogue:"yes" }
]
