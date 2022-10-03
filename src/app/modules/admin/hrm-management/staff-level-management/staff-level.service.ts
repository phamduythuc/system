import { Injectable } from '@angular/core';
import {BaseService} from "../../../../core/base.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StaffLevelService extends BaseService{

  constructor(public http: HttpClient) {
      super(http,environment.apiUrl + '/staff-level')
  }
}
