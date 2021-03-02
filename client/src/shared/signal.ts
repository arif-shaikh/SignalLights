export enum LightState {
    red,
    yellow,
    green
};

export class Signal {
    state: LightState;
    defaultTimeout: number = 2000;

    constructor(inState:LightState = LightState.red) {
        this.state = inState;
    }

    initialize(detaultState: LightState): void {
        this.state = detaultState;
    }

    stop (): void {
        if (this.state == LightState.green) {
            this.state = LightState.yellow;
            setTimeout( () => this.state = LightState.red, this.defaultTimeout);
        }
    }

    start (): void {
        if (this.state == LightState.red) {
            setTimeout(() => this.state = LightState.green, this.defaultTimeout);
        }
    }

}