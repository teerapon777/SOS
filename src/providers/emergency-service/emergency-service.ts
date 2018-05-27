import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertMessage } from '../../models/msg';
import { Observable } from 'rxjs/Observable';
import { emergency } from '../../models/emergency';

/*
  Generated class for the EmergencyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmergencyServiceProvider {


  apiUrl: string = "http://localhost/API/crud_emergency.php";


  constructor(public http: HttpClient) {
    console.log('Hello EmergencyServiceProvider Provider');
  }
  getDataEmer(): Observable<emergency[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'select'
    };
    return this.http.post<emergency[]>(this.apiUrl, data, { headers: header })
  }

  update(id: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'update',
      'id': id,
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });
  }

  getDataAll_history(): Observable<emergency[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'selectAll_his',
    };
    return this.http.post<emergency[]>(this.apiUrl, data, { headers: header })
  }

  getDataAll(): Observable<emergency[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'selectAll',
    };
    return this.http.post<emergency[]>(this.apiUrl, data, { headers: header })
  }
  insert(name: string, category: string, detail: string, location: string, user_id: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'insert',
      'name': name,
      'category': category,
      'detail': detail,
      'location': location,
      'user_id': user_id
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });
  }


}
