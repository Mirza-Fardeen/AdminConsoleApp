import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDomain } from '../admin.domain';
import { constant } from '../constant.domain';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private http: HttpClient, private consta: constant) { }
  adminData: AdminDomain[] = [];
  host = environment.apiUrl;
  login = false;
  ngOnInit(): void {

    this.http.get<AdminDomain>(`${this.host}/user/getAllUpdates`)
      .pipe(map((e: AdminDomain) => {
        for (const j in e) {
          this.adminData.push(e[j]);
          // console.log(e[j]);
        }
      })).subscribe(e => {
        for (const j in this.adminData) {
          console.log(this.adminData[j]);
        }
        console.log(this.consta.login.getValue());
      });


  }

}
