import { Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpHeaders} from '@angular/common/http';

import {MatPaginator} from '@angular/material/paginator';
import * as fileSaver from 'file-saver';
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

  onAdd(element:KaryotypeData)
  {
    let headers = new HttpHeaders();
    let jsonData = {"sampleNo":element.id.sampleNo};
    headers = headers.append('Accept', 'application/pdf; charset=utf-8');
    this.http.post('https://localhost:8443/downloadfile',jsonData,{
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    }).subscribe(response => {const filename = response.headers.get('filename');
    this.saveFile(response.body, filename);}),//console.log(data),
    error => console.log('Error downloading the file.'),
    () => console.info('OK');
  }
  downloadFile(data) {
   // const blob = new Blob([data.blob()], { type: 'text/pdf' });
   // const url= window.URL.createObjectURL(blob);
    let blob:any = new Blob([data], { type: 'application/pdf; charset=utf-8' });
			const url= window.URL.createObjectURL(blob);
			window.open(url);
			window.location.href = data.url;
			fileSaver.saveAs(blob, 'xyz.pdf');
    window.open(url);
  }
  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'application/pdf; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
}

  