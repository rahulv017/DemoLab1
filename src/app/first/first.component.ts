import { Component, Input, OnInit } from '@angular/core';
import {User} from  '../User'
import { InputServiceService } from '../input-service.service';
import { Router } from '@angular/router';
import { TransferUserService } from '../TransferUserService';
import {MatTableDataSource} from '@angular/material/table';
import { Dashboard } from '../Dashboard'
import { AppService } from '../app.service';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
   textArea:number;
   user:User[];
   dataSource;

  displayedColumns:string[];
  constructor(private inputS:InputServiceService,private router:Router,private transfer:TransferUserService,private appService: AppService) {
   this.displayedColumns = ['Brief','Deep','Dementia','Addiction','Bipolar','OCD','Schizophrenia','Population'];

   }

  async onClickButton(data)
  {
    console.log(this.textArea);
    this.inputS.getUserData(this.textArea).subscribe(response => this.sendData(response));
   //this.sendData(data);
   

  }
  sendData(response)
  {
    console.log(response);
    this.transfer.setData(response);
    this.router.navigate(['/breifView',this.textArea]);

  }

  ngOnInit(): void {

    this.fetchData();

    this.appService.setTitle('DashBoard');
  }


  async fetchData()
  {
    let message=await this.dummy();
    this.dataSource =new MatTableDataSource (message);
  }

  dummy():Promise<Dashboard[]>
  {
    const hasError: any = false;
    let promise=new Promise<Dashboard[]>((resolve,reject) =>this.inputS.getDashboardData().subscribe(response => { if(hasError) {
      reject();
    } else {
      resolve(response);
    }})
    );
    return promise;
  }
}
