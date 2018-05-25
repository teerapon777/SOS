import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertMessage } from '../../models/msg';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EmergencyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmergencyServiceProvider {


  apiUrl: string = "http://localhost/API/crud_users.php";


  constructor(public http: HttpClient) {
    console.log('Hello EmergencyServiceProvider Provider');
  }
  insert(name: string, category: string, detail: string, location: string): Observable<AlertMessage> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'insert',
      'email': name,
      'password': category,
      'title': detail,
      'fname': location
    }
    return this.http.post<AlertMessage>(this.apiUrl, data, { headers: header });
  }

}
