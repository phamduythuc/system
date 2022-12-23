import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends BaseService{

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/sprint`);
   }

  create(data: any): Observable<any>  {
    return this.http.post(`${this.serviceUrl}/create`, data);
  }

  getStage(data: any): Observable<any>  {
    return this.http.get(`${this.serviceUrl}/project/${data.projectId}/members?startDateFilter=${data.startDateFilter}`,  data);
  }

  getMembers(data): Observable<any> {
    return this.http.get(`${this.serviceUrl}/project/${data.projectId}/members` , {params: data});
  }

  getRoleStaff(option): Observable<any>{
    return this.http.get(`${environment.apiUrl}/project-role?page=${option.page}&pageSize=${option.pageSize}`, option);
  }
}
