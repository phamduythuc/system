import {Injectable} from '@angular/core';
import {BaseService} from '@core/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, `${environment.apiUrl}/contract`);
  }

  getListContractById(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/contract`, {params: data});
  }

  createContract(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/contract/create`, formData);
  }

  updateContract(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/contract/update`, formData);
  }

}
