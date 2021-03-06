export enum GameState {
    Stopped,
    Started,
    Paused
}

export default class Model {   
    readonly BOXES_AMOUNT: number = 4;
    readonly INTERVAL: number = 1000;

    private sequence: string = '';
    private playerSequence: string = '';
    private isRightSequence: boolean;

    private timer: any;

    public gameState: GameState = GameState.Stopped;

    generateSequence(length: number): void {
        this.sequence = '';
        this.isRightSequence = false;

        for (let i = 0; i < length + 1; i++) {
            const figureNum = this.getRandomInt(0, this.BOXES_AMOUNT);
            this.sequence += String(figureNum);
        }
    }

    getPlayerSequence(figureNum: number): void {
        if (this.isRightSequence) {
            return;
        }

        this.playerSequence += `${figureNum}`;

        if (this.isValidSequence()) {
            document.dispatchEvent(new CustomEvent('set-tip', {
                detail: {
                    currentLength: this.playerSequence.length,
                    wholeLength: this.sequence.length
                }
            }));

            if (this.playerSequence.length === this.sequence.length) { // Go to new level.
                this.isRightSequence = true;
                setTimeout(() => {
                    this.playerSequence = '';
                    this.gameState = GameState.Started;
                    this.generateSequence(this.sequence.length);
                }, this.INTERVAL);
            }
        } else {
            this.stop();
        }
    }

    setTip(currentLength: number, wholeLength: number): void {
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('set-tip', {
                detail: {
                    currentLength,
                    wholeLength
                }
            }));
        }, this.INTERVAL);
    }

    isValidSequence(): boolean {
        return this.playerSequence === this.sequence.substr(0, this.playerSequence.length);
    }

    start(): void {
        document.dispatchEvent(new Event('start'));

        this.gameState = GameState.Started;
        this.sequence = '';
        this.playerSequence = '';

        let counter: number = 0;

        this.generateSequence(this.sequence.length);

        this.timer = setInterval(() => {
            if (this.gameState === GameState.Started) {
                setTimeout(() => {
                    document.dispatchEvent(new Event('disable'));
                }, this.INTERVAL / 2);

                document.dispatchEvent(new CustomEvent('enable', {
                    detail: {
                        id: this.sequence[counter],
                        number: counter,
                    }
                }));
                document.dispatchEvent(new CustomEvent('set-tip', {
                    detail: {
                        currentLength: counter + 1,
                        wholeLength: this.sequence.length
                    }
                }));

                counter++;

                if (counter == this.sequence.length) {
                    this.setTip(0, counter);

                    counter = 0;
                    this.gameState = GameState.Paused;

                    setTimeout(() => {
                        document.dispatchEvent(new Event('pause'));
                    }, this.INTERVAL);
                }
            }

        }, this.INTERVAL);
    }

    stop(): void {
        clearInterval(this.timer);

        document.dispatchEvent(new CustomEvent('stop', {
            detail: {
                score: this.sequence.length - 1
            }
        }));

        this.gameState = GameState.Stopped;

        this.sequence = '';
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}