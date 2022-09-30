import { Injectable } from '@angular/core';
import {BaseService} from "../../../../core/base.service";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentManagementService extends BaseService{
    getDepartment(): Observable<any>{
        return this.get(`${environment.apiUrl}/department`);
    }
    deleteDepartment(id: any): Observable<any>{
        return this.delete(`${environment.apiUrl}/department`, id);
    }
    addDepartment(body): Observable<any>{
        return this.post(`${environment.apiUrl}/department`, body);
    }
    updateDepartment(body): Observable<any>{
        return this.put(`${environment.apiUrl}/department/update`, body);
    }
}
