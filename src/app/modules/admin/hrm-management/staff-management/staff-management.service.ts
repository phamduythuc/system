import { Injectable } from '@angular/core';
import {BaseService} from "@core/base.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService extends BaseService{

  constructor(public http:HttpClient) {
    super(http,`${environment.apiUrl}/staff`)
  }

  createStaff(data):Observable<any>{
    const formData = new FormData();
    formData.append('file', null);
    formData.append('data',  new Blob([JSON.stringify(data)], {type: 'application/json'}));
    return this.http.post(`${environment.apiUrl}/staff/create`,formData)
  }

  updateStaff(data):Observable<any>{
    const formData = new FormData();
    formData.append('file', null);
    formData.append('data',  new Blob([JSON.stringify(data)], {type: 'application/json'}));
    return this.http.post(`${environment.apiUrl}/staff/update`,formData)
  }

  getListDepartment(searchData) :Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/department`,{params: searchData});
  };
  getListPosition(searchData) :Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/position`,{params: searchData});
  };
  getListStaffLevel(searchData) :Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/staff-level`,{params: searchData});
  };

  addMemberTeam(addData):Observable<any>{
    return this.http.post(`${environment.apiUrl}/team-member/add-teamMember`,{params:addData})
  };

  getAvatar(linkPath):Observable<any>{
    return this.http.get(`${environment.apiUrl}/achievement/download?filePath=${linkPath}`,
      {responseType: 'blob', observe: "response"})
  }

}
