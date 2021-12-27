import { LightState, Signal } from "../shared/model/signal";

export class SignalHandler {
    isManual: Boolean;
    toggleFlag: Boolean;

    signalTimings: number;
    signalNorthSouth: Signal;
    signalEastWest: Signal;

    constructor() {
        this.isManual = false;
        this.signalTimings = 5000;
        this.signalNorthSouth = new Signal();
        this.signalEastWest = new Signal();

        this.toggleFlag = false;

        this.signalNorthSouth.initialize(LightState.RED);
        this.signalEastWest.initialize(LightState.GREEN);

        this.processAll();
    }

    getState() {
        let retState = JSON.stringify({
            isManual: this.isManual,
            northSouth: LightState[this.signalNorthSouth.state],
            eastWest: LightState[this.signalEastWest.state]
        });

        console.log(retState)
        return retState;
    }


    startNorthAndSouth() {
        if (this.signalNorthSouth.state == LightState.RED) {
            this.signalNorthSouth.start();
            this.signalEastWest.stop();
        }
    }

    startEastAndWest() {
        if (this.signalEastWest.state == LightState.RED) {
            this.signalNorthSouth.stop();
            this.signalEastWest.start();
        }
    }

    stopAll() {
        this.signalNorthSouth.stop();
        this.signalEastWest.stop();

        this.isManual = true;
    }

    processAll() {
        setInterval(() => {
            if (this.isManual == false) {
                this.toggleFlag ?
                    this.startNorthAndSouth() :
                    this.startEastAndWest();
                this.toggleFlag = !this.toggleFlag;
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