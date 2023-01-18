import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@core/base.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeKeepingService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/timekeeping`);
  }

  importTimeKeeping(formData: any): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiUrl}/timekeeping/import`, formData, {  observe: 'response', responseType: 'blob'});
  }
}
