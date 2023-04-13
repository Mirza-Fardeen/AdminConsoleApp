import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { constant } from '../constant.domain';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router, private consta: constant) { }
  message: string;
  host = environment.apiUrl;
  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {

    console.log(`${f.value.username}   and ${f.value.password} `);

    const user: User = { username: f.value.username, password: f.value.password };
    this.http.post<number | HttpHeaderResponse>(`${this.host}/user/login`, user, { observe: 'response' })
      .subscribe(e => {

        console.log(e);

        localStorage.setItem('token', e.headers.get('jwt-token'));
        console.log(localStorage.getItem('token'));

        f.reset();

        this.router.navigate(['/dashboard']);
        this.consta.login.next(true);
        // this.consta.login.subscribe(e => {
        //   console.log('value in login ' + e.valueOf())
        // })
      }, error => {
        console.log(error.status);
        if (error.status === 403) {
          this.message = " Sorry! username or password is incorrect";
        }
      })
  }
  test() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.http.get(`${this.host}/user/test`, { headers, responseType: 'text' }).subscribe(e => {
      console.log(e);
    })
  }

}

export interface User {
  username: string;
  password: string;
}
