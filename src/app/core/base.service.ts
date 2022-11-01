import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public serviceUrl: string = '';

  constructor(public http?: HttpClient,
              public url?: string, public subUrl?: string) {
    this.serviceUrl = url;
  }

  getOne(id): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  search(searchData?: any): Observable<any> {
    return this.http.get<any>(this.url, {params: searchData});
  }

  save(object: any): Observable<any> {
    return this.http.post<any>(this.url, object);
  }

  update(object: any): Observable<any> {
    return this.http.put<any>(this.url, object);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  get(url: string, p?: any): Observable<any> {
    return this.http.get<any>(url, {params: p, observe: 'response'});
  }

  post(url: string, body?: any): Observable<any> {
    return this.http.post<any>(url, body, {observe: 'response'});
  }

  put(url: string, body?: any): Observable<any> {
    return this.http.put<any>(url, body, {observe: 'response'});
  }

  // delete(url: string, id?: any): Observable<any> {
  //     return this.http.delete<any>(url + '/' + id, {observe: 'response'});
  // }
}
