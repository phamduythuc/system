import { Injectable } from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService  {

  constructor(private http: HttpClient) { 
  
  }

  
}
