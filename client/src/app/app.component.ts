import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { IAppState } from './app.state';
import { LightState } from "../../../shared/model/signal"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'signal';
  signalState: IAppState;
  signalLightState = LightState;
  isProcessing: boolean;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.isProcessing = false;
    this.appService.getState().subscribe((data: IAppState) => this.signalState = data);
    setInterval(() => {
      this.appService.getState().subscribe((data: IAppState) => this.signalState = data);
    }, 1000)
  }

  startProcessing(): void {
    this.isProcessing = true;
    setTimeout(() => this.isProcessing = false, 5000);
  }
  startNorthSouth(): void {
    this.startProcessing();
    this.appService.startNorthSouth().subscribe((data: IAppState) => this.signalState = data);
  }

  startEastWest(): void {
    this.startProcessing();
    this.appService.startEastWest().subscribe((data: IAppState) => this.signalState = data);
  }

  toggleManual(): void {
    this.startProcessing();
    this.appService.toggleManual().subscribe((data: IAppState) => this.signalState = data);
  }
}
