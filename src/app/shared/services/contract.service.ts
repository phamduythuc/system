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

}
