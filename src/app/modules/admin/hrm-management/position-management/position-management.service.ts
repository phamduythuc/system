import { Injectable } from '@angular/core';
import {BaseService} from '../../../../core/base.service';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionManagementService extends BaseService {

  constructor(public http: HttpClient) {
      super(http, environment.apiUrl + '/position');
  }
}
