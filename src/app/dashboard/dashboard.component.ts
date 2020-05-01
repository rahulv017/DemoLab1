import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DashModel } from '../dash-model';
import { RackServiceService } from '../rack-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:DashModel[];
  displayedColumns: string[] = ['can_id', 'rack_id', 'empty_cells'];
  dataSource;
  constructor(public dash:DashModel,public service : RackServiceService) {
    this.data= new Array<DashModel>();
   }

  ngOnInit() {
  this.service.getDashboardList().subscribe(response => this.fetchData(response));

  }

  fetchData(response:DashModel[])
  {
     console.log(`Response recived is ${response}`);
     this.dataSource =new MatTableDataSource (response);
     console.log(`DataSource is ${this.dataSource}`);

  }

}
