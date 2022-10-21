import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {createRequestOption} from "@shared/request-util";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http : HttpClient) { }

  getMenus(roleId:any):Observable<any>{
    return this.http.get(`${environment.apiUrl}/menu`,{params:roleId})
  }
}
