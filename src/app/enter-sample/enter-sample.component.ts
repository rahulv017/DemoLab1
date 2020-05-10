import { Component, OnInit,Inject} from '@angular/core';

import { RackSample } from '../rack-sample';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RackServiceService } from '../rack-service.service';

export interface Lab{
  lab:string;
  sample:number;
}
let labi:Lab={lab:"",sample:0};
@Component({
  selector: 'app-enter-sample',
  templateUrl: './enter-sample.component.html',
  styleUrls: ['./enter-sample.component.css']
})
export class EnterSampleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: RackSample) { 
    
    
  }
  //data:RackSample;
   labii=labi;
  
  ngOnInit() {
     labi.lab=this.data.labName;
     labi.sample=this.data.sampleNo;
     //this.data=this.canS.getData();
     console.log(`Data recived is ${this.data.labName}  `);
  }

  // onSave()
  // {
  //   this.data.labName=this.lab;
  //   this.data.sampleNo=this.sample;
  //   this.service.sendRackData(this.data);
  //   this.router.navigate(['/RackDashboard']);
    
  // }

  // onCancel()
  // {
  //   this.router.navigate(['/RackDashboard']);
  // }

}
