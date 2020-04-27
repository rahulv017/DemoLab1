import { Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


export interface PendingRequest {
  sample: string;
  position: number;
  dno: string;
  symbol: number;
  status:string;
}

const ELEMENT_DATA: PendingRequest[] = [
  {position: 1, dno: 'D045', sample: '1023',status:'Completed', symbol: 2},
  {position: 2, dno: 'D808', sample: '4006',status:'Incomplete', symbol: 0},
  {position: 3, dno: 'D128', sample: '6941',status:'Partially', symbol: 1},
  {position: 4, dno: 'D090', sample: '1003',status:'Completed', symbol: 2},
  {position: 5, dno: 'D868', sample: '4890',status:'Incomplete', symbol: 0},
  {position: 6, dno: 'D738', sample: '9441',status:'Partially', symbol: 1},
];

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['position', 'dno', 'sample', 'status','symbol'];
  dataSource =new MatTableDataSource (ELEMENT_DATA);

  @ViewChild(MatSort,{static:true}) sort:MatSort;

  applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.sample.toLowerCase().includes(filter) || data.status.toLowerCase().includes(filter) ||data.dno.toLowerCase().includes(filter) 
      || data.symbol.toString().includes(filter) || data.position.toString().includes(filter);
  };
  
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
  }

}
