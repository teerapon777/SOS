import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertMessage } from '../../models/msg';
import { users } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenServiceProvider {

  apiUrl: string = "http://localhost/API/crud_users.php";


  constructor(public http: HttpClient) {
    console.log('Hello AuthenServiceProvider Provider');
  }
  getDatauser(user: string): Observable<users[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'selectUser',
      'email': user
    };
    return this.http.post<users[]>(this.apiUrl, data, { headers: header })
  }

  getAllData(): Observable<users[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'select'
    }
    return this.http.post<users[]>(this.apiUrl, data, { headers: header });
  }
  signup(email: string, password: string, titleName: string, fname: string, lname: string, phone: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'insert',
      'email': email,
      'password': password,
      'title': titleName,
      'fname': fname,
      'lname': lname,
      'phone': phone,
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });
  }
  login(email: string, password: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'login',
      'email': email,
      'password': password
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });

  }
  del(user_id: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'delete',
      'user_id': user_id,
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });
  }

}
