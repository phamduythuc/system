import { Injectable } from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamManagementService extends BaseService{

  constructor(http: HttpClient) {
    super(http,environment.apiUrl+'/team')
  }
}
