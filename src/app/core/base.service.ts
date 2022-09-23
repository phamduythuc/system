import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(public http: HttpClient) {
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

    delete(url: string, id?: any): Observable<any> {
        return this.http.delete<any>(url + '/' + id, {observe: 'response'});
    }
}
