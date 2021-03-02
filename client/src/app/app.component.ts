import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { LightState } from 'src/shared/signal';
import {ISignalState, LightService} from './light.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'signal';
  signalState:ISignalState;

  constructor(private lightService: LightService ){
   
  }

  ngOnInit(): void {
    this.signalState = {
      "state":false,"north": 0,"south":0,"east":2,"west":2
    };

    setInterval(
      ()=>{
        this.lightService.get().subscribe(
          data => this.signalState = data,
          error => console.log(error)
        );
      },
      1000
    )
  }
}
