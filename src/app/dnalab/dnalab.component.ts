
import { Component, OnInit,ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-dnalab',
  templateUrl: './dnalab.component.html',
  styleUrls: ['./dnalab.component.css']
})
export class DNALABComponent implements OnInit {

  displayedColumns: string[] = [ 'DNO', 'Sample','Date','Location','DoneBy','Conc','Total','A260',
                                    'A280','260/280','260/230','Catalogue','Edit'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;

  constructor(public service:RackServiceService,public router:Router,public dialog: MatDialog) { }
  ngOnInit() {
    this.service.getALLDNALCLData().subscribe(response => this.fetchData(response));
    
    
  }

  fetchData(response)
  {
    
    this.dataSource = new MatTableDataSource<DNAData>(response);
    this.dataSource.paginator = this.paginator;
    
  }
  onEdit(data:RackSample)
  {
     data.labName="";
     data.sampleNo=0;
     this.dataSource.paginator = this.paginator;

  }

  onAdd(element:DNAData)
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
        element.doneby=data.doneby;
        element.conc=data.conc;
        element.total=data.total;
        element.a260=data.a260;
        element.a280=data.a280;
        element.a260By230=data.a260By230;
        element.a260By280=data.a260By280;
        element.catalogue=data.catalogue;
      console.log(element);
     this.service.sendDNALCLData(element).subscribe();
      }
    });
  }

   // this.service.sendRackData(data);
     // this.router.navigate(['/enterSample']);
  
    
  onSearchSample(data:DNAData)
  {
        
  }

}

const ELE:DNAData[]=[
  {dno:"D123",sampleNo:123,date:new Date(),doneby:"SN",conc:"12",total:"12",a260:"1.2",a280:"1.3",a260By230:"1.3",
      a260By280:"1.40",catalogue:"yes" }
]
