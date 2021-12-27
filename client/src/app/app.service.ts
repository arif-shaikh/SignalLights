import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LightState } from '../../../shared/model/signal'
import { IAppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  serverUrl: string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getState() {
    return this.http.get<IAppState>(this.serverUrl);
  }
  startNorthSouth() {
    return this.http.get<IAppState>(this.serverUrl + '/startnorthsouth');
  }
  startEastWest() {
    return this.http.get<IAppState>(this.serverUrl + '/starteastwest');
  }
  stopAll() {
    return this.http.get<IAppState>(this.serverUrl + '/stopall');
  }
  toggleManual() {
    return this.http.get<IAppState>(this.serverUrl + '/togglemanual');
  }
}
