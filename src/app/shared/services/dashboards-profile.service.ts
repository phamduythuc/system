import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardsProfileService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, environment.apiUrl + '/staff');
  }

  downloadFile(filePath): Observable<any> {
    return this.http.get(`${environment.apiUrl}/achievement/download?filePath=${filePath}`,
      {responseType: 'blob', observe: 'response'});
  }

  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user-info`);
  }

  getKPI(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/staff/kpi/397`, {params: data});
  }

  getKPIByToken(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/staff/kpi`, {params: data});
  }


  getSprint(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sprint/project-staff`, {params: data});
  }

  updateEffort(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}/effort-detail/update-effort-percent`, data);
  }
}
