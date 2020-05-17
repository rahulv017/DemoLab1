import { Injectable } from '@angular/core';
import{User} from './User';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  user:User;
  private userList;
  

  // getName():string
  // {
  //     return this.userList.name;
  // }

  // getPosition():number
  // {
  //     return this.userList.position;
  // }

  // setPosition(data)
  // {
  //     this.userList.position=data;
  // }

  // setName(data:string)
  // {
  //     this.userList.name=data;
  // }

  getData():User
 {
   let temp:User=this.userList;
   this.userList=undefined;
   return temp;

 }

 setData(dataList:User)
 {
   this.userList=dataList;
 }

}
