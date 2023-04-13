import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constant } from '../constant.domain';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  login: boolean;
  constructor(private consta: constant, private route: Router) { }

  ngOnInit(): void {
    console.log(this.consta.login);

    this.consta.login.subscribe(e => {

      this.login = e;
    })

  }
  onLogOut() {
    const token = localStorage.getItem('token');
    console.log("...logging out");
    localStorage.removeItem('token');
    this.consta.login.next(false);
    this.route.navigate(['']);

  }

}
