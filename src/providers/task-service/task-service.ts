import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertMessage } from '../../models/msg';
import { Observable } from 'rxjs/Observable';
import { task } from '../../models/task';

/*
  Generated class for the TaskServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskServiceProvider {

  apiUrl: string = "http://localhost/API/crud_task.php";


  constructor(public http: HttpClient) {
    console.log('Hello TaskServiceProvider Provider');
  }
  insert(emer_id: string, user_id: string, detail: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'insert',
      'emer_id': emer_id,
      'user_id': user_id,
      'detail': detail
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });
  }
  getDataAll(): Observable<task[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'select',
    };
    return this.http.post<task[]>(this.apiUrl, data, { headers: header })
  }



}
