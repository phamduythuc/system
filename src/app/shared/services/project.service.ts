import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '@core/base.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

  constructor(public http: HttpClient) {
    super(http,environment.apiUrl + '/project')
  }
  getProjectTypes(group: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}/categories/group/${group}`)
  }
}
