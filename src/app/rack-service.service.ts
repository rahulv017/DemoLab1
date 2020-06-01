import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CellData } from './CellData';
import { Observable } from 'rxjs';
import { RackSample } from './rack-sample';
import { jwt } from './jwt';
import { Mycoplasma } from './mycoplasma';
import{DashModel} from '../app/dash-model'
import { LabLinking } from './lab-linking';
import { FreezerData } from './freezer-data';
import { DNAData } from './dnadata';
import { PlasmaSerum } from './plasma-serum';
import { GeneData } from './gene-data';
import { PBMCDATA } from './pbmcdata';
import { KaryotypeData } from './karyotypedata';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class RackServiceService {


   path:string;
   port:string;
  constructor(private http:HttpClient, private router:Router,private pathS:PathService) {
    this.path=this.pathS.getPath();
    this.port=this.pathS.getPort();
    console.log(this.path);
   }

 /* authenticate():Observable<jwt>{
    let data = { "username":"Piyush","password":"Piyush"};
    let url = this.path+this.port+/authenticate";
    return this.http.post<jwt>(url,data);
  }*/

    //JWT:jwt;

    //= 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQaXl1c2giLCJleHAiOjE1ODQyMDk1ODksImlhdCI6MTU4NDE3MzU4OX0.mNtaoHSSKwB2LzG-_Fdj8cAXb01G8P-61SNZCzH6V5w';

  sendRackData(data:RackSample)
  {
    //const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/saverackinfo';
    console.log(data);
    return this.http.put(url,data);
  }

  sendFrezerTwentyData(data:FreezerData)
  {
    //const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/save20freeze';
    console.log(data);
    return this.http.put(url,data);
  }

  sendFrezerEightyData(data:FreezerData)
  {
  //  const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/save80freeze';
    console.log(data);
    return this.http.put(url,data);
  }

  sendDNALCLData(data:DNAData)
  {
    //const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/savednalcl';
    console.log(data);
    return this.http.put(url,data);
  }

  sendDNABloodData(data:DNAData)
  {
    //const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/savednablood';
    console.log(data);
    return this.http.put(url,data);
  }

  sendPBMCData(data:PBMCDATA)
  {
  //  const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/savepbmc';
    console.log(data);
    return this.http.put(url,data);
  }

  sendGeneprintData(data:GeneData)
  {
  //  const headers = {'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/savegeneprint';
    console.log(data);
    return this.http.put(url,data);
  }

  searchRack(data:number):Observable<RackSample[]>
  {
    console.log(data);
    let jsondata = {'sampleNo' : data};
  //  const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getrack';
    return this.http.post<RackSample[]>(url,jsondata);
  }

  removeRack(data:RackSample[])
  {
      console.log(data);
     // let jsondata = {'sampleNo' : data};
    //const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/deleterack';
    return this.http.put<RackSample[]>(url,data);

  }

  updateMycoplasma(data:Mycoplasma)
  {
    console.log(data);
    // let jsondata = {'sampleNo' : data};
  // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};

   let url=this.path+this.port+'/updatemycoplasma';

   return this.http.put(url,data);
  }

  getSampleList():Observable<LabLinking[]>
  {
    //console.log(data);
    // let jsondata = {'sampleNo' : data};
   //const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};

   let url=this.path+this.port+'/getstatus';

   return this.http.get<LabLinking[]>(url);
  }

  getDashboardList():Observable<DashModel[]>
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};

    let url=this.path+this.port+'/rackdashboard';
 
    return this.http.get<DashModel[]>(url);
  }

  getAllRackData()
  {
   // let jsondata = {'sampleNo' : data};
  //  const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getrack';
    return this.http.get<RackSample[]>(url);
  }

  getAllFrezeerTwentyData()
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/get20freeze';
    return this.http.get<FreezerData[]>(url);
  }

  getAllFrezeerEightyData()
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/get80freeze';
    return this.http.get<FreezerData[]>(url);
  }

  getALLDNALCLData()
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getdnalcl';
    return this.http.get<DNAData[]>(url);
  }

  getALLDNABloodData()
  {
 //   const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getdnablood';
    console.log("Getting all dna blood");
    return this.http.get<DNAData[]>(url);
  }

  getALLDNAPlasmaData()
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/status/true';
    return this.http.get<PlasmaSerum[]>(url);
  }

  getALLMycoplasmaData()
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getmyco'; 
    return this.http.get<Mycoplasma[]>(url);
  }

  getALLGeneprintData()
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getgeneprint'; 
    return this.http.get<GeneData[]>(url);
  }

  getAllKaryotypeData(){
    let url=this.path+this.port+'/getgeneprint'; 
    return this.http.get<KaryotypeData[]>(url);
  }

  getALLPBMCData()
  {
 //   const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/getpbmc'; 
    return this.http.get<PBMCDATA[]>(url);
  }

  getALLPendingRequest()
  {
  //  const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/status/false';
    return this.http.get<LabLinking[]>(url);
  }

  sendPendingRequests(data:LabLinking, oldSampleNo:number)
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/status/savestatus';
    console.log(data);
    let jsondata = {"labMapping":data, "oldSampleNo":oldSampleNo};
    return this.http.put(url,jsondata);
  }

  fetchRackCanister(data)
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/fetchrackinfo'; 
    return this.http.post<RackSample[]>(url,data);
  }

  fetchFridge20(data)
  {
  //  const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/fetch20fridge'; 
    return this.http.post<FreezerData[]>(url,data);
  }

  fetchFridge80(data)
  {
   // const headers = { 'Authorization': 'Bearer '+this.JWT.jwt};
    let url=this.path+this.port+'/fetch80fridge'; 
    return this.http.post<FreezerData[]>(url,data);
  }

  fetchCyroVials(data)
  {
    console.log(data);
    let url=this.path+this.port+'/fetchcryovials'; 
    return this.http.post<number>(url,data);
  }

  removeRackEntry(data:RackSample)
  {
    let url=this.path+this.port+'/removerack'; 
    return this.http.put(url,data);
  }

  removeFridge20Entry(data:FreezerData)
  {
    let url=this.path+this.port+'/removefridge20'; 
    return this.http.put(url,data);
  }

  removeFridge80Entry(data:FreezerData)
  {
    let url=this.path+this.port+'/removefridge80'; 
    return this.http.put(url,data);
  }



  
}
