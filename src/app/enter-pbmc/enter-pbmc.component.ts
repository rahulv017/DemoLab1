import { Component, OnInit,Inject } from '@angular/core';
import { Mycoplasma } from '../mycoplasma';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { PBMCDATA } from '../pbmcdata';

let labi=new PBMCDATA();
@Component({
  selector: 'app-enter-pbmc',
  templateUrl: './enter-pbmc.component.html',
  styleUrls: ['./enter-pbmc.component.css']
})
export class EnterPBMCComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PBMCDATA) { }
  labii=labi;
  
   ngOnInit() {
    let i=0;
    this.labii.dateC=this.data.dateC;
    this.labii.dateP=this.data.dateP;
    this.labii.count=this.data.count;
    this.labii.doneBy=this.data.doneBy;
    this.labii.remarks=this.data.remarks;
  
    
     
   }

}
