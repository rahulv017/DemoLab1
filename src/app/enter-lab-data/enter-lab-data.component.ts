import { Component, OnInit } from '@angular/core';
import { Mycoplasma } from '../mycoplasma';
import { RackServiceService } from '../rack-service.service';
import { LabLinking } from '../lab-linking';
const ELEMENT_DATA:Mycoplasma[]=
[

   {sampleNo:123,result:"Positive",status:true,date: new Date(),name: "Rahul"}

]
let sample_list=[];
@Component({
  selector: 'app-enter-lab-data',
  templateUrl: './enter-lab-data.component.html',
  styleUrls: ['./enter-lab-data.component.css']
})


export class EnterLabDataComponent implements OnInit {

  constructor(public  myco:Mycoplasma,public service:RackServiceService) {
    this.todayDate= new Date();
    console.log(this.todayDate);
   }
  todayDate;
  list_sample=[];
  selectResult;
  selectStatus;
  result=["Positive","Negative"];
  status=["Complete","Incomplete"];
  selectLab: string;
  selectSample;
  samples: number[] =[1,2,3,4];
  labs: string[] = ['Mycloplasma', 'Geneprint', 'Kyrotyping', 'PBMC','DNA'];
  ngOnInit() {
     this.service.getSampleList().subscribe(response => this.fetchData(response));
    
  }


   fetchData(response:LabLinking[])
   {

     console.log(response);
     let i=0;
      for(i=0;i<response.length;i++)
      {
        sample_list.push(response[i].id.sampleNo);

      console.log(`Sample list is : ${this.list_sample}`);
      this.list_sample=sample_list;
   }
  }
  onSaveMyco()
  {

    this.myco.sampleNo=this.selectSample;
    this.myco.date=this.todayDate;
    this.myco.result=this.selectResult;
    if(this.selectStatus==this.status[0])
    this.myco.status=true;
    else
    this.myco.status=false;
    console.log(`Mycoplasma is ${this.myco}`);
    this.service.updateMycoplasma(this.myco).subscribe();
  
    
  }

}

