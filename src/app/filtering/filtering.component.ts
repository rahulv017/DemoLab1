import { Component, OnInit } from '@angular/core';
import { RowFilter } from './RowFilter';
import { ColFilterService } from '../col-filter.service';
import { Router } from '@angular/router';
import { InputServiceService } from '../input-service.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {
  table;
  selected;
  select;
  selectTest;
  listCol;
  numbers=[];
  num;
  concanted:string='';
  name_list;
  constructor(private rowUser:RowFilter,private userList:ColFilterService,private router:Router,private inputS:InputServiceService) {
    this.rowUser=new RowFilter;
    this.name_list='';
    this.table=['Brief','Deep'];
    this.listCol=['sociodemography','hopi','developmental','age'];
    let i:number;
    //this.numbers=new Array[100];
    for(i=1;i<100;i++)
    {
      this.numbers[i]=i;
    }
    //this.num=null;
    
   }

   onClick()
   {
     
     if(this.num!=undefined&&this.num!=null)
     {
      this.concanted=this.concanted+' '+this.select+' '+this.selectTest+' '+ this.num;
      this.rowUser.age=this.num;
      if(this.selectTest=='greater')
       this.rowUser.sign='ge';
       else
       this.rowUser.sign='le';
     }
     
     else
     {
      this.concanted=this.concanted+' '+this.select+'='+this.selectTest;
      if(this.select==this.listCol[0])
      {
        if(this.selectTest=='T')
        this.rowUser.sociodemography=true;
        else
      {
        this.rowUser.sociodemography=false;
      }
      }
      

      if(this.select==this.listCol[1])
      {
        if(this.selectTest=='T')
        this.rowUser.hopi=true;
        else
        {
          this.rowUser.hopi=false;
        }
      }
     

      if(this.select==this.listCol[2])
      {
        if(this.selectTest=='T')
        this.rowUser.developmental=true;
        else
        {
          this.rowUser.developmental=false;
        }
      }
     
     }
    
     this.num=null;
     this.selectTest=null;
     this.select=null;
     //this.selected=null;
     console.log(this.concanted);
     this.concanted=this.concanted+' and ';
   }

   onClickSave()
   {
    if(this.num!=undefined&&this.num!=null)
    this.concanted=this.concanted+' '+this.select+' '+this.selectTest+' '+ this.num;
    else if(this.select!=null)
    this.concanted=this.concanted+' '+this.select+'='+this.selectTest;
    this.num=null;
    this.concanted='select * from brief where '+this.concanted;
       console.log(this.selected+' '+this.concanted);
       console.log(this.rowUser.developmental);
             
       this.userList.setData(this.concanted);
      // this.inputS.getBreifTable(this.userList.getData()).subscribe(response => console.log(response));


       this.selected=null;
             this.selectTest=null;
             this.select=null;
             this.concanted='';
            console.log(this.userList.getData());
             this.router.navigate(['/second']);
   }
  
  ngOnInit(): void {
  }

}
