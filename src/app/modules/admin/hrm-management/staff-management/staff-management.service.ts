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

  getListDepartment(searchData) :Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/department`,{params: searchData});
  };
  getListPosition(searchData) :Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/position`,{params: searchData});
  };
  getListStaffLevel(searchData) :Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/staff-level`,{params: searchData});
  };

}
