import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

// const BASE_PATH = "http://192.168.0.102:3000";
const BASE_PATH = "http://localhost:3000";

@Injectable()
export class AdminService {

    public token: string;

    constructor(private http: HttpClient, @Inject(AppStorage) private appStorage: Storage, private router: Router) { }

    getUsers(token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/account/all', httpOptions);
    }

    getInvites(token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/admin/invite/all', httpOptions);
    }

    deleteInvite(token, id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.delete<any>(BASE_PATH + '/admin/invite/' + id, httpOptions);
    }


    deleteUser(token, email) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.delete<any>(BASE_PATH + '/admin/user/' + email, httpOptions);
    }

    newCode(token, json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.post<any>(BASE_PATH + '/admin/invite', json, httpOptions);
    }

    updateDeal(token, id, json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.put<any>(BASE_PATH + '/listings/old/' + id, json, httpOptions);
    }

    DeleteDeal(token, json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': token
            },
            )
        };
        return this.http.post<any>(BASE_PATH + '/listings/deleteDeal',json, httpOptions);
    }
    deleteListing(token, id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.delete<any>(BASE_PATH + '/listings/old/' + id, httpOptions);
    }

    markVerified(token, id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/admin/verified/' + id, httpOptions);
    }

    markNotVerified(token, id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.delete<any>(BASE_PATH + '/admin/verified/' + id, httpOptions);
    }

}
