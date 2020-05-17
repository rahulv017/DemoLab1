import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserServiceService } from '../user-service.service';
import { InputServiceService } from '../input-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-brief',
  templateUrl: './update-brief.component.html',
  styleUrls: ['./update-brief.component.css']
})

export class UpdateBriefComponent implements OnInit {


  data:string[];
  previouS:User;
   checked:boolean[];
   len;
  constructor(private UserS:UserServiceService,private Inputs:InputServiceService,private router:Router) {

    this.data=['sociodemography','hopi','developmental','physical_exam',
    'mse','life_chart','treatment','dsm5CC','pedigree','mini','asrs','hmse','cgi_S'];
    this.len=this.data.length;
    let m=0;
    this.checked=new Array<boolean>();
    for(m=0;m<this.len;m++)
    this.checked[m]=false;
    //this.checked.forEach(item => item=false);
    this.previouS=this.UserS.getData();
    JSON.stringify(this.previouS);
    let k=0;
    for(k=0;k<this.len;k++)
    {
      console.log(this.previouS[this.data[k]]);
      this.checked[k]=this.previouS[this.data[k]];
    }
    // this.checked[0]=this.previouS.sociodemography;
    // this.checked[1]=this.previouS.HOPI;
    // this.checked[2]=this.previouS.Developmental;
    // this.checked[3]=this.previouS.sociodemography;
    // this.checked[4]=this.previouS.sociodemography;
    // this.checked[5]=this.previouS.sociodemography;
    // this.checked[6]=this.previouS.sociodemography;
    // this.checked[7]=this.previouS.sociodemography;
    // this.checked[8]=this.previouS.sociodemography;

  
    //this.checked = [false,false,false,false,false];
   }

  ngOnInit(): void {
    

  }

  onClick()
  {
    let k=0;
    for(k=0;k<this.len;k++)
    {
     this.previouS[this.data[k]]=this.checked[k];
    }
    this.Inputs.saveBriefUpdated(this.previouS).subscribe();

    alert("Data Saved");
    this.router.navigate(['/second']);



  }

}

