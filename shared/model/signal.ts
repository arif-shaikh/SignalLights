const rpio = require("rpio");

export enum LightState {
    red,
    yellow,
    green
};

export class Signal {
    state: LightState;
    defaultTimeout: number = 2000;

    ledRed: number;
    ledYellow: number;
    ledGreen: number;


    onRed() {
	rpio.write(this.ledRed, rpio.HIGH);
	//rpio.sleep(1);
    }
    offRed() {
	rpio.write(this.ledRed, rpio.LOW);
	//rpio.sleep(1);
    }
    onYellow() {
	rpio.write(this.ledYellow, rpio.HIGH);
	//rpio.sleep(1);
    }
    offYellow() {
	rpio.write(this.ledYellow, rpio.LOW);
	//rpio.sleep(1);
    }
    onGreen() {
	rpio.write(this.ledGreen, rpio.HIGH);
	//rpio.sleep(1);
    }
    offGreen() {
	rpio.write(this.ledGreen, rpio.LOW);
	//rpio.sleep(1);
    }



    constructor(inState:LightState = LightState.red, RED_GPIO: number, YELLOW_GPIO: number, GREEN_GPIO: number) {
        this.state = inState;

	this.ledRed = RED_GPIO
	this.ledYellow = YELLOW_GPIO;
	this.ledGreen = GREEN_GPIO;
	
	
	rpio.open(this.ledRed, rpio.OUTPUT, (this.state == LightState.red)? rpio.HIGH: rpio.LOW);
	rpio.open(this.ledYellow, rpio.OUTPUT, rpio.LOW);
	rpio.open(this.ledGreen, rpio.OUTPUT, (this.state == LightState.green)? rpio.HIGH: rpio.LOW);
    }

    initialize(detaultState: LightState): void {
        this.state = detaultState;
    }

    stop (): void {
        if (this.state == LightState.green) {
            this.state = LightState.yellow;
            this.onYellow();

            setTimeout( () => {
		this.state = LightState.red;

                this.onRed();
                this.offYellow();
                this.offGreen();
	    }, this.defaultTimeout);
        }
    }

    start (): void {
        if (this.state == LightState.red) {
            setTimeout(() => {
                  this.state = LightState.green

                  this.offRed();
                  this.offYellow();
                  this.onGreen();
            }, this.defaultTimeout);

        }
    }

}