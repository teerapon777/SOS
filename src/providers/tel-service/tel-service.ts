import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertMessage } from '../../models/msg';
import { Observable } from 'rxjs/Observable';
import { tel } from '../../models/tel';

@Injectable()
export class TelServiceProvider {

  apiUrl: string = "http://localhost/API/crud_tel.php";

  constructor(public http: HttpClient) {
    console.log('Hello TelServiceProvider Provider');
  }
  getDataAll(): Observable<tel[]> {
    const header = { 'Content-Type': 'application/json' };
    let data = {
      'cmd': 'select',
    };
    return this.http.post<tel[]>(this.apiUrl, data, { headers: header })
  }

}
