import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/staff`);
  }

  getListAllUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/staff`);
  };

  createStaff(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/staff/create`, formData)
  }

  updateStaff(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/staff/update`, formData);
  }

  getListDepartment(searchData): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/department`, {params: searchData});
  };

  getListPosition(searchData): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/position`, {params: searchData});
  };

  getListStaffLevel(searchData): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/staff-level`, {params: searchData});
  };

  getKpiData(searchData): Observable<any> {
    return this.http.get<any>(`${this.serviceUrl}/kpi/${searchData.staffId}`, {params: searchData});
  };

  saveMemberTeam(addData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/team-member/add-member`, addData);
  };

  getAvatar(linkPath): Observable<any> {
    return this.http.get(`${environment.apiUrl}/achievement/download?filePath=${linkPath}`,
      {responseType: 'blob', observe: 'response'});
  }
  getRoleStaff(option): Observable<any>{
    return this.http.get(`${environment.apiUrl}/role`, {params: option});
  }


  getListTeam(searchData): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/team`, {params: searchData});
  };
}
