import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { LightState } from 'src/shared/signal';

export interface ISignalState {
  state: boolean;
  north: LightState;
  south: LightState;
  east: LightState;
  west: LightState
}

@Injectable({
  providedIn: 'root'
})
export class LightService {
   lightUrl = "http://localhost:5000/";

  constructor(private httpClient: HttpClient) { }
  get(): Observable<ISignalState>{
    return this.httpClient.get<ISignalState>(this.lightUrl);
  }

  startNS(): Observable<any>{
    return this.httpClient.get(this.lightUrl + "startnorthsouth");
  }
  startEW(): Observable<any>{
    return this.httpClient.get(this.lightUrl + "starteastwest");
  }
  manual(): Observable<any>{
    return this.httpClient.get(this.lightUrl + "togglemanual");
  } 
  stopAll(): Observable<any>{
    return this.httpClient.get(this.lightUrl + "stopall");
  }
}
