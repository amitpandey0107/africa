import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DealsService {
    public token: string;
    constructor(private http: HttpClient, private router: Router) { }
    dealData= [];
    setDealData(item) {
        this.dealData = item;
    }

    getDealData() {
        return this.dealData;
    }
}
