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
@Component({
  selector: 'app-mycoplasma-lab',
  templateUrl: './mycoplasma-lab.component.html',
  styleUrls: ['./mycoplasma-lab.component.css']
})
export class MycoplasmaLabComponent implements OnInit {
  displayedColumns: string[] = [ 'DNO', 'Sample','Date','doneby','User','Report','A','B','A/B','Machine','Edit'];
dataSource;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(public dialog: MatDialog,public service:RackServiceService) { }

  ngOnInit() {
    this.service.getALLMycoplasmaData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    this.dataSource = new MatTableDataSource<Mycoplasma>(response);
    this.dataSource.paginator = this.paginator;
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
     //   element.catalogue=data.catalogue;
    //  console.log(data.totalVol);
      console.log(element);
     this.service.updateMycoplasma(element).subscribe();
      }
    });
  }

}
