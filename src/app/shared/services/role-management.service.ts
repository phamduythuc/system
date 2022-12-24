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
    super(http, `${environment.apiUrl}/project-role/all`);
  }

  createRole(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project-role`, formData)
  }

  updateRole(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/project-role`, formData);
  }
  deleteRole(id: any): Observable<any> {
    console.log(id);
    
    return this.http.delete(`http://103.226.248.168:8089/api/project-role/${id}`);
  }
  getListAllRole(): Observable<any> {
    return this.http.get<any>("http://103.226.248.168:8089/api/project-role/all");
  };

}
