import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-background-cohort',
  templateUrl: './background-cohort.component.html',
  styleUrls: ['./background-cohort.component.css']
})
export class BackgroundCohortComponent implements OnInit {

  opened:boolean;

  constructor(private router: Router) {
    this.opened=false;
   }

   

  ngOnInit(): void {
    this.router.navigate(['/first']);
  }

}
