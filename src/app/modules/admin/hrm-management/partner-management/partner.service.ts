import { Injectable } from '@angular/core';
import {BaseService} from "@core/base.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService{

  constructor(public http:HttpClient) {
    super(http,environment.apiUrl+'/partner')
  }
}
