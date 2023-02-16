import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from '@core/base.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/salary`);
   }
  getViewSalarybyMonth(params): Observable<any> {
    return this.http.get(`${environment.apiUrl}/salary/get-by-month`, {params: params});
  }
  saveSalary(params): Observable<any> {
    return this.http.post(`${environment.apiUrl}/salary`, params);
  }
  saveImport(month, formData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/salary/import-template?month=${month}` , formData);
  }
}
