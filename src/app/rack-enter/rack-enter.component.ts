import { Component, OnInit } from '@angular/core';
import { CellData } from '../CellData';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: RackSample[] = [
  {id:{canId:"Venus",rackId:"Rack A",boxId:"Box 1",cellId:1},labName:"PBMC",sampleNo:1},
  {id:{canId:"Venus",rackId:"Rack A",boxId:"Box 1",cellId:2},labName:"PBMC",sampleNo:2}
];
let  list_select=[];
@Component({
  selector: 'app-rack-enter',
  templateUrl: './rack-enter.component.html',
  styleUrls: ['./rack-enter.component.css']
})
export class RackEnterComponent implements OnInit {


  displayedColumns: string[] = ['select','Canister', 'Rack', 'Box', 'Cell','Lab']; //for removing 
  displayedColumns1: string[] = ['Canister', 'Rack', 'Box', 'Cell','Lab']; //for searching
  dataSource;
 // dataSource = new MatTableDataSource<RackSample>(ELEMENT_DATA);
  selection = new SelectionModel<RackSample>(true, []);
  constructor(private cell:CellData,private service:RackServiceService,private cellD:CellData) {
    this.select_box=null;
    this.select_can=null;
    this.select_cell=null;
    this.select_rack=null;
    this.vails=false;
    this.search=false;
    this.remove=false;
    this.show_t=false;
    this.show_table=false;
    this.service.authenticate().subscribe(response=>service.JWT=response);
    //this.list_select=[];
   }
 
  select_can;
  select_rack;
  select_box;
  select_lab;
   select_cell=new Array();
  vails:boolean;
  search:boolean;
  remove:boolean;
  sample;
  show_t:boolean; //table for searching
  show_table:boolean; //table for removing
  ngOnInit() {
  }

  onSubmit()
  {
    this.cell.canId=this.select_can;
    this.cell.rackId=this.select_rack;
    this.cell.boxId=this.select_box;
    this.cell.cellId=this.select_cell;
    this.cell.sampleNo=this.sample;
    this.cell.labName=this.select_lab;
    this.service.sendRackData(this.cell).subscribe();
    alert("You have entered "+"Canister "+this.select_can+" Cells "+ this.select_cell +" Sample No "+this.sample);
    this.select_box=null;
    this.select_can=null;
    
    this.select_cell=null;
    this.select_rack=null;
  }

  onSearch()
  {
    console.log(this.sample);
    this.show_t=true;
    this.service.searchRack(this.sample).subscribe(response => this.fetchData(response));
    alert('OK!!');
  }

  onRemove()
  {
    this.service.searchRack(this.sample).subscribe(response => this.fetchData(response));
   
        this.show_table=true;
  }

  fetchData(response:RackSample[])
  {
     console.log(response);
     this.dataSource = new MatTableDataSource<RackSample>(response);
     alert(response);
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // if(numSelected===numRows)
    // {
    //   let i;
    //   for(i=0;i<ELEMENT_DATA.length;i++)
    //   {
    //     if(!list_select.includes(ELEMENT_DATA[i]))
    //     {
    //       list_select.push(ELEMENT_DATA[i]);
    //     }
    //   }
    //   console.log(list_select);
    // }
    
    return numSelected === numRows;
  }

  onChange(row:RackSample)
  {
    //$event.stopPropogation();
    if(this.selection.isSelected(row)==false){
      if(!list_select.includes(row)){
        list_select.push(row);
      }
    }
    else{
      if(list_select.includes(row))
      list_select = list_select.filter(item => item != row);
    }
    console.log(list_select);
  }

  onSave()
  {
    this.service.removeRack(list_select).subscribe();
    alert('Selected items removed');
    this.sample=null;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));

        if(this.selection.isSelected(this.dataSource.data[0]))
        {
          let i;
      for(i=0;i<this.dataSource.data.length;i++)
      {
        if(!list_select.includes(this.dataSource.data[i]))
        {
          list_select.push(this.dataSource.data[i]);
        }
      }
      console.log(list_select);
        }
        else{
          let i;
          while(list_select.length>0)
          {
            list_select.pop();
          }
          console.log(list_select);
        }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: CellData1): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1}`;
  // }

}
