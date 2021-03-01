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
        this.signalTimings = 4000;
        this.signalSouth2North = new Signal();
        this.signalNorth2South = new Signal();
        this.signalEast2West = new Signal();
        this.signalWest2East = new Signal();

        this.toggleFlag = false;

        this.signalSouth2North.initialize(LightState.RED);
        this.signalNorth2South.initialize(LightState.RED);
        this.signalEast2West.initialize(LightState.GREEN);
        this.signalWest2East.initialize(LightState.GREEN);

        this.processAll ();
    }

    startNorthAndSouth (){
        if (this.signalSouth2North.state == LightState.RED) {
            this.signalSouth2North.start();
            this.signalNorth2South.start();
            this.signalEast2West.stop();
            this.signalWest2East.stop();
        }
    }

    startEastAndWest (){
        if (this.signalEast2West.state == LightState.RED) {
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