import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';

@Injectable()
export class TransferUserService{

  constructor(private route:Router) { }

   private userList;
   getData():User[]
   {
     let temp:User[]=this.userList;
     this.userList=undefined;
     return temp;

   }

   setData(dataList:User[])
   {
     this.userList=dataList;
   }

}
