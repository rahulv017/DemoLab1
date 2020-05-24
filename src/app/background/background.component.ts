import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  opened:boolean;
  title: String;

  constructor(private router: Router,private appService: AppService) {
    this.opened=false;
   }

   

  ngOnInit(): void {
    this.router.navigate(['/RackInformation'])
    this.appService.getTitle().subscribe(appTitle => this.title = appTitle);
  }

}
