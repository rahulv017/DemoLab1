import { Component, Input,OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DashModel } from '../dash-model';
import { RackServiceService } from '../rack-service.service';
import { TableUtil } from "../tableUtil";
import * as XLSX from "xlsx";
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:DashModel[];
  displayedColumns: string[] = ['can_id', 'rack_id', 'empty_cells'];
  dataSource;

  canfilter = new FormControl('');
  rackfilter = new FormControl('');

 // globalFilter = '';
  filteredValues = {
    cannister: '', rack: '', emptyCells: ''
  
  };

  constructor(public dash:DashModel,public service : RackServiceService,private appService: AppService) {
    this.data= new Array<DashModel>();


   }

  ngOnInit() {
  this.service.getDashboardList().subscribe(response => this.fetchData(response));

  this.appService.setTitle('Available Cells');

  }
  

  fetchData(response:DashModel[])
  {
     console.log(`Response recived is ${response}`);
     this.dataSource =new MatTableDataSource (response);
     console.log(`DataSource is ${this.dataSource}`);


     this.canfilter.valueChanges.subscribe((canFilterValue) => {
      this.filteredValues['cannister'] = canFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.rackfilter.valueChanges.subscribe((rackFilterValue) => {
      this.filteredValues['rack'] = rackFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  

/*applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();
  }*/

  exportTable() {
    TableUtil.exportTableToExcel("Exportdash");
  }


  customFilterPredicate() {
    const myFilterPredicate = (data:DashModel, filter: string): boolean => {
      // var globalMatch = !this.globalFilter;

      // if (this.globalFilter) {
      //   // search all text fields
      //   globalMatch = data.id.boxId.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      // }

      // if (!globalMatch) {
      //   return;
      // }

      let searchString = JSON.parse(filter);
      return data.cannister.toString().trim().toLowerCase().indexOf(searchString.cannister.toLowerCase()) !== -1 &&
        data.rack.toString().trim().toLowerCase().indexOf(searchString.rack.toLowerCase()) !== -1;
      
    }
    return myFilterPredicate;
  }


}
