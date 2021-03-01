export enum LightState {
    RED = "RED",
    YELLOW = "YELLOW",
    GREEN = "GREEN"
};

export class Signal {
    state: LightState;
    defaultTimeout: number = 2000;

    constructor(inState:LightState = LightState.RED) {
        this.state = inState;
    }

    initialize(detaultState: LightState): void {
        this.state = detaultState;
    }

    stop (): void {
        if (this.state == LightState.GREEN) {
            this.state = LightState.YELLOW;
            setTimeout( () => this.state = LightState.RED, this.defaultTimeout);
        }
    }

    start (): void {
        if (this.state == LightState.RED) {
            setTimeout(() => this.state = LightState.GREEN, this.defaultTimeout);
        }
    }

}