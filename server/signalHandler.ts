import { LightState, Signal } from "../shared/model/signal";
 	
export class SignalHandler {
    isManual: Boolean;
    toggleFlag: Boolean;

    signalTimings: number;
    signalSouth2North: Signal;
    signalNorth2South: Signal;
    signalEast2West: Signal;
    signalWest2East: Signal;


    constructor() {
        this.isManual = false;
        this.signalTimings = 6000;
        this.signalSouth2North = new Signal(LightState.red, 36, 38, 40);
        this.signalNorth2South = new Signal(LightState.red, 8, 10, 12);
        this.signalEast2West = new Signal(LightState.red, 22, 24, 26);
        this.signalWest2East = new Signal(LightState.red, 3, 5, 7);

        this.toggleFlag = false;

        this.signalSouth2North.initialize(LightState.red);
        this.signalNorth2South.initialize(LightState.red);
        this.signalEast2West.initialize(LightState.green);
        this.signalWest2East.initialize(LightState.green);


        this.processAll ();
    }

    startNorthAndSouth (){
        if (this.signalSouth2North.state == LightState.red) {
            this.signalSouth2North.start();
            this.signalNorth2South.start();
            this.signalEast2West.stop();
            this.signalWest2East.stop();
        }
    }

    startEastAndWest (){
        if (this.signalEast2West.state == LightState.red) {
            this.signalSouth2North.stop();
            this.signalNorth2South.stop();
            this.signalEast2West.start();
            this.signalWest2East.start();
        }
    }

    stopAll (){
        this.signalSouth2North.stop();
        this.signalNorth2South.stop();
        this.signalEast2West.stop();
        this.signalWest2East.stop();

        this.isManual = true;
    }

    processAll () {
        setInterval(() => {
            if (this.isManual == false) {
                this.toggleFlag ?
                    this.startNorthAndSouth():
                    this.startEastAndWest();
                this.toggleFlag = ! this.toggleFlag;
            }
        }, this.signalTimings);
    }

    toggleManual() {
        this.isManual = !this.isManual;
        if (this.isManual) {
            this.stopAll();
        }
    }

}