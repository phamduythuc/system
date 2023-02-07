import { Injectable } from '@angular/core';
import {BaseService} from '@core/base.service';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseService{
    constructor(public http: HttpClient) {
        super(http, environment.apiUrl + '/department');
    }
}
