import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})

export class ThemeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(environment.token = '') {
      this.router.navigate(['/login']);
    }
  }

}
