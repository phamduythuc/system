import { Injectable } from '@angular/core';
import { BaseService } from '@core/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService extends BaseService {

  constructor(http: HttpClient) {
    super(http, environment.apiUrl + '/team-member');
  }

  saveMembers(addData): Observable<any> {
    return this.http.post(`${this.serviceUrl}/add-member`, addData);
  };

  getListMember(teamId: any): Observable<any> {
    return this.http.get<any>(`${this.serviceUrl}`, { params: teamId });
  }

}
