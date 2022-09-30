import { Injectable } from '@angular/core';
import {BaseService} from "../../../../core/base.service";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DepartmentManagementService extends BaseService{
    apiUrl = environment.apiUrl;
    constructor(public http: HttpClient) {
        super(http, environment.apiUrl + '/department');
    }
    getDepartment(): Observable<any> {
        return this.get(this.apiUrl + '/department');
    }
}
