import { Component, OnInit,Inject} from '@angular/core';

import { RackSample } from '../rack-sample';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RackServiceService } from '../rack-service.service';
import { GeneData } from '../gene-data';

let labi:GeneData=new GeneData();

@Component({
  selector: 'app-enter-geneprint',
  templateUrl: './enter-geneprint.component.html',
  styleUrls: ['./enter-geneprint.component.css']
})
export class EnterGeneprintComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GeneData) { 
    
    
  }
  //data:RackSample;
   labii=labi;
  
  ngOnInit() {
   
    this.labii.blood=this.data.blood;
     this.labii.date=this.data.date;
     this.labii.lcl=this.data.lcl;
     this.labii.isMatch=this.data.isMatch;
     this.labii.ipsc=this.data.ipsc;
     this.labii.nsc=this.data.nsc;
     this.labii.exome=this.data.exome;
     this.labii.status=this.labii.status;
     
     console.log(`Data recived is ${this.data.id.sampleNo}  `);
  }

}
