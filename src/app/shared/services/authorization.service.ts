import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {createRequestOption} from '@shared/request-util';
import {BaseService} from '@core/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends BaseService{

  constructor(public http : HttpClient) {
    super(http,environment.apiUrl+'/role')
  }

  getMenus(roleId:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/menu`,{params:roleId})
  }

  saveMenu(data):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/role/save-permission`,data)
  }

  getRoles():Observable<any>{
    return this.http.get(`${environment.apiUrl}/role`)
  }
}
