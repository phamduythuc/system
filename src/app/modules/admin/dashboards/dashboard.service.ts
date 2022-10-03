import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
    // apiUrl = environment.apiUrl;
    // getAllCluster(): Observable<any> {
    //     return this.get(this.apiUrl+'/user/getAll');
    // }
    constructor(public http: HttpClient) {
        super(http, environment.apiUrl + '/user');
    }
}
