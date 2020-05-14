import { Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LabLinking } from '../lab-linking';
import { RackServiceService } from '../rack-service.service';
import {MatPaginator} from '@angular/material/paginator';
import { EventEmitter } from 'protractor';

export class LabLink {
  ele:LabLinking;
  sample:number;
}


let samples;
@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = [ 'dno', 'sample','save'];
  sample;
  dataSource;
  lab=new Array<LabLink>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort:MatSort;

  applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.sample.toLowerCase().includes(filter) || data.status.toLowerCase().includes(filter) ||data.dno.toLowerCase().includes(filter) 
      || data.symbol.toString().includes(filter) || data.position.toString().includes(filter);
  };
  
  }
    
  constructor(public lablink:LabLinking,public service:RackServiceService) { }

  ngOnInit(): void {
    
    
    this.service.getALLPendingRequest().subscribe(response => this.fetchData(response) )
  }

  fetchData(response:LabLinking[])
  {
    let i=0;
    for(i=0;i<response.length;i++)
    {
      let JsonData={"ele":response[i],"sample":response[i].id.sampleNo}
      this.lab.push(JsonData);
    }
       this.dataSource=new MatTableDataSource(this.lab);
  }

  onBefore(event:EventListener)
  {
  }

  onAdd(element:LabLink)
  {
   //  let sam=samples[element.]
       if(this.sample instanceof String)
       {
         alert("Type numerical values.Data not saved");
         this.sample=0;
       }
       else{
        // element.id.sampleNo=this.sample;
         element.ele.status=true;
         let m=element.sample;
         console.log(element.ele);
         this.service.sendPendingRequests(element.ele,m).subscribe();
         alert('Saved');
         this.lab = [];
         this.service.getALLPendingRequest().subscribe(response => this.fetchData(response));
       }
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
  }

}
