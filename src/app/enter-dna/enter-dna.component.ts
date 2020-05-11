import { Component, OnInit,Inject} from '@angular/core';

import { RackSample } from '../rack-sample';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RackServiceService } from '../rack-service.service';
import { DNAData } from '../dnadata';
export class Lab{
  date:Date;
  doneby:string;
  conc:string;
  total:string;
  A260:string;
  A280:string;
  A2628:string;
  A2623:string;
  coagulate:string;
}
let labi:DNAData=new DNAData();
@Component({
  selector: 'app-enter-dna',
  templateUrl: './enter-dna.component.html',
  styleUrls: ['./enter-dna.component.css']
})
export class EnterDNAComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DNAData) { 
    
    
  }
  //data:RackSample;
   labii=labi;
  
  ngOnInit() {
     this.labii.date=this.data.date;
     this.labii.doneBy=this.data.doneBy;
     this.labii.conc=this.data.conc;
     this.labii.totalVol=this.data.totalVol;
     this.labii.a260=this.data.a260;
     this.labii.a280=this.data.a280;
     this.labii.a260By330=this.data.a260By330;
     this.labii.a260By280=this.data.a260By280;
     this.labii.catalogue=this.data.catalogue;
     //this.data=this.canS.getData();
     console.log(`Data recived is ${this.data.id.sampleNo}  `);
  }

}
