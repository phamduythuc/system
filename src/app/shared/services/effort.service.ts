import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EffortService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/effort`);
  }


  update(data: any) {
    return this.http.put(`${this.serviceUrl}/update`, data);
  }

  getStage(data): Observable<any> {
    return this.http.get(`${this.serviceUrl}/stage`, {params: data});
  }

  getListProject(data): Observable<any> {
    return this.http.get(`${this.serviceUrl}/project-staff`, {params: data});
  }

  updatePercentEffort(data): Observable<any> {
    return this.http.put(`${this.serviceUrl}/update/effort-percent`, data);
  }

  getMembers(data): Observable<any> {
    return this.http.get(`${this.serviceUrl}/project/${data.projectId}/members`, {params: data});
  }

}
