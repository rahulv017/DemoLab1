
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GeneData  } from '../gene-data'
import { EnterGeneprintComponent } from '../enter-geneprint/enter-geneprint.component';

import { TableUtil } from "../tableUtil";
import * as XLSX from "xlsx";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-geneprint-lab',
  templateUrl: './geneprint-lab.component.html',
  styleUrls: ['./geneprint-lab.component.css']
})
export class GeneprintLabComponent implements OnInit {

  displayedColumns: string[] = [ 'sample', 'blood','date','lcl','match','ipsc','nsc','Edit'];
  dataSource;
  Stored_response: GeneData[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;
  
  
    constructor(public service:RackServiceService,public router:Router,public dialog: MatDialog) { }
  
    ngOnInit() {
      this.service.getALLGeneprintData().subscribe(response => this.fetchData(response));
    }
    fetchData(response:GeneData[])
    {
      this.Stored_response=response;
      
      this.dataSource = new MatTableDataSource<GeneData>(response);
      this.dataSource.paginator = this.paginator;
      
    }

    exportArray() {
      
      
      TableUtil.exportArrayToExcel(this.Stored_response, "Exportgeneprint");
    }

    exportTable() {
      TableUtil.exportTableToExcel("Exportgeneprint");
    }

    onEdit(data:RackSample)
    {
       data.labName="";
       data.sampleNo=0;
       this.dataSource.paginator = this.paginator;
  
    }
  
    onAdd(element:GeneData)
    {
      const dialogRef = this.dialog.open(EnterGeneprintComponent, {
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
          element.blood=data.blood;
          element.date=data.date;
          element.lcl=data.lcl;
          element.isMatch=data.isMatch;
          element.ipsc=data.ipsc;
          element.nsc=data.nsc;
          element.exome=data.exome;
          
        console.log(element);
       this.service.sendGeneprintData(element).subscribe();
        }
      });
    }
  
     // this.service.sendRackData(data);
       // this.router.navigate(['/enterSample']);
    
      
    // onSearchSample(data:GeneData)
    // {
          
    // }
  
  }
  
  const ELE:GeneData[]=[
    {id:{dNo:"D123",sampleNo:1234},blood:"X:87:56:8",date:new Date(),lcl:"12",isMatch:"Yes",ipsc:"12",nsc:"12",exome:"1.2" }
  ]
