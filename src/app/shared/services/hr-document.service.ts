import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrDocumentService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/document`);
  }
  getAllDoc(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/document`);
  }
  createDocument(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/document/create`, formData);
  }

}
