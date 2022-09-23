import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
    apiUrl = environment.apiUrl;
    getAllCluster(): Observable<any> {
        return this.get(this.apiUrl+'/user/getAll');
    }
}
