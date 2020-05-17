import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  opened:boolean;

  constructor(private router: Router) {
    this.opened=false;
   }

   

  ngOnInit(): void {
    this.router.navigate(['/RackInformation'])
  }

}
