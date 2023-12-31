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

  getSprint(data: any): Observable<any>  {
    return this.http.get(`${this.serviceUrl}/${data.projectId}/project?month=${data.startDate}`,  data);
  }

  // getMembers(data): Observable<any> {
  //   return this.http.get(`${this.serviceUrl}/project/${data.projectId}/members` , {params: data});
  // }
  getMembers(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/effort-detail?sprintId=${data.id}`,  data);
  }

  getRoleStaff(data): Observable<any>{
    return this.http.get(`${environment.apiUrl}/project-role?page=${data.page}&pageSize=${data.pageSize}`, {params: data});
  }

  update(formData: any): Observable<any> {
    return this.http.put(`${this.serviceUrl}/update`, formData);
  }

  getOne(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/project/${id}`);
  }
}
