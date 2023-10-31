import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  getCategories(group?: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/categories/group/${group}`);
  }
}
