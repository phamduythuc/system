import { Injectable } from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService{

  constructor(http: HttpClient) {
    super(http,environment.apiUrl+'/team')
  }

  getTeamKpi(searchModel:any) :Observable<any> {
    return this.http.get<any>(`${this.serviceUrl}/list-team-target`, { params: searchModel });
  }

  getTeamDetaiBySprint(searchModel:any) :Observable<any> {
    return this.http.get<any>(`${this.serviceUrl}/team-target`, { params: searchModel });
  }

  getTeamById(id:any):Observable<any>{
    return this.http.get<any>(`${this.serviceUrl}/${id}`);
  }

  upDateTeamLeader(body:any):Observable<any>{
    return this.http.post<any>(`${this.serviceUrl}/sprint-team-lead`, body, {observe: 'response'});
  }
}
