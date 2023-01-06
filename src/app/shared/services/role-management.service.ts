import { Injectable } from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService extends BaseService  {

  constructor(public http: HttpClient) { 
    super(http, `${environment.apiUrl}/project-role`);
  }

  createRole(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project-role`, formData)
  }

  updateRole(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/project-role`, formData);
  }
  deleteRole(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/project-role/${id}`);
  }
  getListAllRole(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/project-role`);
  };

}
