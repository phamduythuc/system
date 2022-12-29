import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import {environment} from '@env/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, environment.apiUrl + '/achievement');
  }

  downloadFile(filePath): Observable<any> {
    return this.http.get(`${environment.apiUrl}/achievement/download?filePath=${filePath}`,
      {responseType: 'blob', observe: 'response'});
  }

  renderFile(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/achievement/download`,{params:data});
  }
  dowFile(filePath: string): Observable< HttpEvent<Blob>> {
    // return this.http.get(`${environment.apiUrl}/achievement/download?filePath=${filePath}`,
    return this.http.get(`${environment.apiUrl}/achievement/download/${filePath}`,
      { reportProgress: true,
        responseType: 'blob',
        observe: 'events' });
  }
}
