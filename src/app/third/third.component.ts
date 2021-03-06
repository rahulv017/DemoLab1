import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Deep } from '../Deep';
import { InputServiceService } from '../input-service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {


  data:Deep[];
  dataSource;
displayedColumns: string[] = ['h','i','n','o','v','w',
      'x','y','z','aa','ab','ac','ad','ae','af','ag','ah','ai','aj','ak','al','am','an','id','ass_id'];
  

  applyFilter(filtervalue: string){
    this.dataSource.filter= filtervalue.trim().toLowerCase();

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.i.toLowerCase().includes(filter) || data.n.toLowerCase().includes(filter)  || data.o.toLowerCase().includes(filter) 
      || data.v.toLowerCase().includes(filter)  || data.w.toLowerCase().includes(filter)  || data.x.toLowerCase().includes(filter) 
      || data.y.toLowerCase().includes(filter)  || data.z.toLowerCase().includes(filter)  || data.aa.toLowerCase().includes(filter) 
      || data.ab.toLowerCase().includes(filter)  || data.ac.toLowerCase().includes(filter)  || data.ad.toLowerCase().includes(filter) 
      || data.ae.toLowerCase().includes(filter)  || data.af.toLowerCase().includes(filter)  || data.ag.toLowerCase().includes(filter) 
      || data.ah.toLowerCase().includes(filter)  || data.ai.toLowerCase().includes(filter)  || data.aj.toLowerCase().includes(filter) 
      || data.ak.toLowerCase().includes(filter)  || data.al.toLowerCase().includes(filter)  || data.am.toLowerCase().includes(filter) 
      || data.an.toLowerCase().includes(filter)  || data.user.adbs_ID.toString().includes(filter)  || data.user.assessment_ID.toString().includes(filter) ;
  };
  
  }

  constructor(private inputS:InputServiceService) {

    
   }

   ngOnInit(): void {

     this.fetchTable();
  }

  async fetchTable()
  {
    this.data=await this.dummy();
    console.log(this.data);
    this.dataSource =new MatTableDataSource (this.data);
  }

  dummy():Promise<Deep[]>
  {
    const hasError: any = false;
    let promise=new Promise<Deep[]>((resolve,reject) =>this.inputS.getCompleteDeepTable().subscribe(response => { if(hasError) {
      reject();
    } else {
      resolve(response);
    }})
    );
    return promise;

  }

}
