import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {createRequestOption} from "../../../shared/request-util";
import {environment} from "../../../../environments/environment";
import {User} from "../../../core/user/user.types";

type EntityResponseType = HttpResponse<User>;

@Injectable({providedIn: 'root'})
export class SettingService {
    constructor(
        private http: HttpClient
    ) {
    }

    // cache data when navigate from user config to user detail
    CurrentUserManagement = {};


    userMessChange: Subject<any> = new Subject<any>();

    public resourceUrl = `${environment.apiUrl}/users`

    getSearchServerByID(id: any): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/server/searchServerByCluster?id=` + id, {observe: 'response'})
    }

    getItemCluster(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/clusters`, {observe: 'response'})
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.resourceUrl, user);
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(this.resourceUrl, user);
    }


    getListWpGroup(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/team`, {observe: 'response'});
    }

    updateReadedMess(data: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/notification-users/saveAll`, data);
    }

    updateStatus(user: User): Observable<User> {
        return this.http.put<User>(`${environment.apiUrl}/users/update-status`, user);
    }

    resetPass(id): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/users/reset-password/${id}`, null);
    }

    find(login: string): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/${login}`, {observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(login: string): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${login}`);
    }

    getNotifications(userId?: any): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/notification/count-notice-of-user/${userId}`, {observe: 'response'});
    }

    getUserChat(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.get<any>(`${this.resourceUrl}/notifications`, {params: options, observe: 'response'});
    }

    getMessage(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.get(`${environment.apiUrl}/notifications`, {params: options, observe: 'response'});
    }

    downloadFile(downloadLink): Observable<any> {
        return this.http.get(`${environment.apiUrl}/notification/get-file?type=type&&path=${downloadLink}`)
    }

    deleteMessage(data: any): Observable<any> {
        return this.http.put(`${environment.apiUrl}/notification-users/saveAll`, data);

    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/users/authorities`);
    }

    getAuthority(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/authority`);
    }
    getHdfsUser(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/users-vt/searchDHdfsUser`, {observe: 'response'});
    }

    addUser(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users/addUser`, data)
    }

    addOrEditGroup(obj: any): Observable<any> {
        if (!obj?.id) {
            return this.http.post<any>(`${environment.apiUrl}/team`, obj, {observe: 'response'});
        } else {
            return this.http.put<any>(`${environment.apiUrl}/team`, obj, {observe: 'response'});
        }
    }

    deleteGroup(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/team/${id}`, {observe: 'response'});
    }

    deleteCluster(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/clusters/${id}`, {observe: 'response'});
    }
}
