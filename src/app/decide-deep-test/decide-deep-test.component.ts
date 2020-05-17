import { Component, OnInit, Input } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import{SelectionModel} from '@angular/cdk/collections';
import {Location} from '@angular/common'
import { Router } from '@angular/router';
import { ViewLabReportComponent } from '../view-lab-report/view-lab-report.component';
import { InputServiceService } from '../input-service.service';
import { UserServiceService } from '../user-service.service';
import { User } from '../User';
import { Deep } from '../Deep';
import { deepEqual } from 'assert';



@Component({
  selector: 'app-decide-deep-test',
  templateUrl: './decide-deep-test.component.html',
  styleUrls: ['./decide-deep-test.component.css']
})
export class DecideDeepTestComponent implements OnInit {
   data=[];
   //createDeepUser:Deep;
   @Input() childMessage:string;
   checked:boolean[];
  constructor(private location:Location,private router:Router,private inputS:InputServiceService, private createDeepUser:Deep) {
    this.data=['MRI','Eye Tracking','fNIRS','EEG','Neuropsych'];
    this.checked = [false,false,false,false,false];
    this.finalSData=[];
   }
 
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
   initialSelection = [];
 allowMultiSelect = true;
 finalSData:any;
 
//selection = new SelectionModel<PeriodicElement>(this.allowMultiSelect, this.initialSelection);


async onClick()
{
  let i;
  let k=0;
  for(i=0;i<this.data.length;i++)
  {
       if(this.checked[i]==true)
       {
       this.finalSData[k]=this.data[i];
       k=k+1;
       }
  }
  
  //this.finalSData=this.data.filter(item => this.checked[item.position]==true);
  console.log(this.finalSData);
  let message=await this.saveData(this.createDeepUser);

  this.router.navigate(['/third']);

}

saveData(data:Deep)
{
   const hasError:any=false;
   console.log(data);
   let promise=new Promise((resolve,reject) =>this.inputS.saveDeepUser(data).subscribe(response => { if(hasError) {
    reject();
  } else {
    resolve(response);
  }})
  );
  return promise;

}

displayedColumns: string[] = ['v','w',
      'x','y','z','aa','ab','ac','ad','ae','af','ag','ah','ai','aj','ak','al','am','an'];
onBack()
{
  window.history.back();
}
  ngOnInit(): void {

    this.fetchUser();
  }

  async fetchUser()
  {
    console.log(this.childMessage);
    let message=await this.dummy(this.childMessage);
    this.createDeepUser.user=message;
    console.log(this.createDeepUser.user);
    //JSON.stringify(this.createDeepUser);
    let i=0;
    for(i=0;i<this.displayedColumns.length;i++)
    {
      this.createDeepUser[this.displayedColumns[i]]="NA";
    }




  }

  dummy(data):Promise<User>
  {
    const hasError: any = false;
    let promise=new Promise<User>((resolve,reject) =>this.inputS.getUserDataByAssID(data).subscribe(response => { if(hasError) {
      reject();
    } else {
      resolve(response);
    }})
    );
    return promise;
  }



}
