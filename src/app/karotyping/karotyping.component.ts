import { Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpHeaders} from '@angular/common/http';

import {MatPaginator} from '@angular/material/paginator';

import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnterSampleComponent } from '../enter-sample/enter-sample.component';
import { KaryotypeData } from '../karyotypedata';

@Component({
  selector: 'app-karotyping',
  templateUrl: './karotyping.component.html',
  styleUrls: ['./karotyping.component.css']
})



export class KarotypingComponent implements OnInit {
  percentDone: number;
  pdfSrc: string = '/pdf-test.pdf';
  

  displayedColumns: string[] = [ 'dno', 'sample','upload','download'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enter_sample:number;
  enter_lab:string;
  uploadSuccess=false;
  constructor(public service:RackServiceService,public router:Router,private http: HttpClient,) { }
  ngOnInit() {
    this.service.getAllKaryotypeData().subscribe(response => this.fetchData(response));
    
  }

  fetchData(response)
  {
    
    this.dataSource = new MatTableDataSource<KaryotypeData>(response);
    this.dataSource.paginator = this.paginator;
  }


  upload(files: File,element:KaryotypeData){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgressSingle(files,element);
  }

 
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File,element:KaryotypeData){
    const uploadPdfData = new FormData();
    uploadPdfData.append('file',file);
    uploadPdfData.append('sampleNo',element.id.sampleNo.toString());    
    //let pdfFile={"sampleNo":element.id.sampleNo,"file":file};
    //const header:HttpHeaders=new HttpHeaders({'enctype':'multipart/form-data'})
    this.http.put('https://localhost:8443/uploadFile', uploadPdfData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    },err => {
                    console.error(JSON.stringify(err));
                  alert('Got an error !! file Not uploaded')});
  }

  onAdd()
  {

  }
}

  