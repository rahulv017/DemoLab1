import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DashModel } from '../dash-model';
import { RackServiceService } from '../rack-service.service';
import { TableUtil } from "../tableUtil";
import * as XLSX from "xlsx";

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
  exportTable() {
    TableUtil.exportTableToExcel("Exportdash");
  }

}
