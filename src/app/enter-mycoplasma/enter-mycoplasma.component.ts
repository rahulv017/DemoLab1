import { Component, OnInit,Inject } from '@angular/core';
import { Mycoplasma } from '../mycoplasma';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';

let labi=new Mycoplasma();
@Component({
  selector: 'app-enter-mycoplasma',
  templateUrl: './enter-mycoplasma.component.html',
  styleUrls: ['./enter-mycoplasma.component.css']
})
export class EnterMycoplasmaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Mycoplasma) { }
 labii=labi;
 
  ngOnInit() {
   let i=0;
   this.labii.a=this.data.a;
   this.labii.b=this.data.b;
   this.labii.bBya=this.data.bBya;
   this.labii.date=this.data.date;
   this.labii.machine=this.data.machine;
   this.labii.user=this.data.user;
   this.labii.passage=this.data.passage;
   this.labii.result=this.labii.result;
   this.labii.status=this.labii.status;
   
    
  }

}
