import { Injectable } from '@angular/core';
import {BaseService} from "../../../../core/base.service";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentManagementService extends BaseService{
    apiUrl = environment.apiUrl;
    getDepartment(): Observable<any>{
        return this.get(this.apiUrl + '/department');
    }
}
