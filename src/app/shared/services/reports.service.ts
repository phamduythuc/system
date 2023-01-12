import { Injectable } from '@angular/core';
import { BaseService } from '@core/base.service';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, environment.apiUrl + '/report');
  }

  createReports(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/report`, formData)
  }

  updateReports(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/report`, formData);
  }


}
