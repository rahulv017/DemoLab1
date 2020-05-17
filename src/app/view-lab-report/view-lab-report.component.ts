import { Component, OnInit, ViewChild, ElementRef ,AfterViewInit, Renderer2} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import { User } from '../User';
import { Router } from '@angular/router';
import { InputServiceService } from '../input-service.service';
import { Status } from '../status';
import { LCLReportService } from '../lclreport.service';
import { LCL } from '../Lcl_Lab';

@Component({
  selector: 'app-view-lab-report',
  templateUrl: './view-lab-report.component.html',
  styleUrls: ['./view-lab-report.component.css']
})
export class ViewLabReportComponent implements OnInit {
@ViewChild('op1',{read: ElementRef,static:true}) op1:ElementRef;
@ViewChild('op2',{read: ElementRef,static:true}) op2:ElementRef;
@ViewChild('op3',{read: ElementRef,static:true}) op3:ElementRef;
@ViewChild('op4',{read: ElementRef,static:true}) op4:ElementRef;
@ViewChild('op5',{read: ElementRef,static:true}) op5:ElementRef;

  data:User;
  isSelected:boolean;
  lab:LCL;
  constructor(private UserS:UserServiceService,private router:Router,private inputS:InputServiceService,private status:Status,private render:Renderer2 , private labR:LCLReportService) { 
    this.data= UserS.getData();
    let m = this.data;
      console.log(m);
      console.log(m.d_no);
      this.inputS.getLabStatusDetails().subscribe(response => this.fetchData(response));
  
    this.isSelected=false;
    this.isDecided=false;
  }

  LCL:number;
  DNA:number;
  PBMNC:number;
  Geneprint:number;
  Kyrotyping:number;
  sampleNo:number;
  message:string;

  ngOnInit(): void {
      
    
  }

  async fetchData(response)
  {
    console.log(response);
      this.status=response;
      this.message=this.status.d_no;

      console.log(this.message);

      this.DNA=this.status.dna_Status;
      this.LCL=this.status.lcl_Status;
      this.PBMNC=this.status.pbmnc_Status;
      this.Geneprint=this.status.geneprint_Status;
      this.Kyrotyping=this.status.kyrotyping_Status;
      this.sampleNo = this.status.sample_no;

      console.log(this.LCL);
      console.log(this.op1.nativeElement);
      if(this.LCL==0){
        this.render.setStyle(this.op1.nativeElement,'color','red');
        this.render.setAttribute(this.op1.nativeElement,'disabled','true');
      }
      if(this.LCL==1){
        this.render.setStyle(this.op1.nativeElement,'color','yellow');
        //this.render.setAttribute(this.op1.nativeElement,'disabled','true');
      }
      if(this.LCL==2)
        this.render.setStyle(this.op1.nativeElement,'color','green');

      console.log(this.DNA);
      
      if(this.DNA==0){
          this.render.setStyle(this.op2.nativeElement,'color','red');
          this.render.setAttribute(this.op2.nativeElement,'disabled','true');
      }
      if(this.DNA==1){
          this.render.setStyle(this.op2.nativeElement,'color','yellow');
          this.render.setAttribute(this.op2.nativeElement,'disabled','true');
      }
      if(this.DNA==2)
          this.render.setStyle(this.op2.nativeElement,'color','green');

      if(this.PBMNC==0){
          this.render.setStyle(this.op3.nativeElement,'color','red');
          this.render.setAttribute(this.op3.nativeElement,'disabled','true');
      }
      if(this.PBMNC==1){
          this.render.setStyle(this.op3.nativeElement,'color','yellow');
          this.render.setAttribute(this.op3.nativeElement,'disabled','true');
      }
      if(this.PBMNC==2)
          this.render.setStyle(this.op3.nativeElement,'color','green');

      if(this.Geneprint==0){
          this.render.setStyle(this.op4.nativeElement,'color','red');
          this.render.setAttribute(this.op4.nativeElement,'disabled','true');
      }
      if(this.Geneprint==1){
          this.render.setStyle(this.op4.nativeElement,'color','yellow');
          this.render.setAttribute(this.op4.nativeElement,'disabled','true');
      }
      if(this.Geneprint==2)
          this.render.setStyle(this.op4.nativeElement,'color','green');
      
      if(this.Kyrotyping==0){
          this.render.setStyle(this.op5.nativeElement,'color','red');
          this.render.setAttribute(this.op5.nativeElement,'disabled','true');
      }
      if(this.Kyrotyping==1){
          this.render.setStyle(this.op5.nativeElement,'color','yellow');
          this.render.setAttribute(this.op5.nativeElement,'disabled','true');
      }
      if(this.Kyrotyping==2)
          this.render.setStyle(this.op5.nativeElement,'color','green');

   //console.log(this.LCL);
    
  

  }

  labFetch(response)
  {
    this.labR.setData(response);
   // console.log(this.labR.getData());
   this.lab=this.labR.getData();
   console.log(this.lab);

  }
  
  onClickLCL(){
    if(this.LCL==1)
    {
      this.isSelected=!this.isSelected;
      console.log(this.sampleNo);
      let sendLCL={'Sample_no':this.sampleNo,'labName':'LCL'};
      this.inputS.getLabSpecificDetails(sendLCL).subscribe(response => this.labFetch(response));
      
    //  console.log(this.lab[0].LclVial_Jupiter);


    }
  }

  onClickDNA()
  {
      
  }

  onClickPBMNC()
  {

  }

  onClickKyrotyping()
  {

  }

  onClickGeneprint()
  {

  }

  isDecided:boolean;
  onDecide()
  {
    this.isDecided=!this.isDecided;
    //this.router.navigate(['/DecideDeep']);
  }
}
