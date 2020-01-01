import * as $ from "jquery";

interface IAction {
    actionName: string,
    callback: EventListenerOrEventListenerObject
}

/**
 * View class.
 */
export default class View {
    readonly box: HTMLDivElement = document.querySelector('.box');
    readonly figures: NodeListOf<HTMLButtonElement> = this.box.querySelectorAll(':scope > .item');
    readonly startButton: HTMLButtonElement = document.querySelector('#button_start');
    readonly tipHeader: HTMLDivElement = document.querySelector('.tip-header');
    readonly tip: HTMLDivElement = document.querySelector('.tip');
    readonly scoreText: HTMLDivElement = document.querySelector('.score-text');

    constructor() {
        const actionsConfig: Array<IAction> = [
            {
                actionName: 'enable',
                callback: (e: CustomEvent) => {
                    const { id, number } = e.detail;
                    this.fadeIn(id, number);
                }
            },
            {
                actionName: 'disable',
                callback: () => {
                    this.fadeOut();
                }
            },
            {
                actionName: 'start',
                callback: () => {
                    this.start();
                }
            },
            {
                actionName: 'stop',
                callback: (e: CustomEvent) => {
                    const { score } = e.detail;
                    this.stop(score);
                }
            },
            {
                actionName: 'pause',
                callback: () => {
                    this.pause();
                }
            },
            {
                actionName: 'set-tip',
                callback: (e: CustomEvent) => {
                    const { val1, val2 } = e.detail;
                    this.setTip(val1, val2);
                }
            }
        ]

        this.initActions(actionsConfig);
    }

    initActions(actionsConfig: Array<IAction> = []): void {
        for (let key in actionsConfig) {
            const action = actionsConfig[key];
            const { actionName, callback }: IAction = action;
            document.addEventListener(actionName, callback);
        }
    }

    setTip(val1: number, val2: number): void {
        this.tip.textContent = `${val1} / ${val2}`;
    }

    fadeOut(): void {
        this.figures.forEach(figure => {
            figure.removeAttribute('style');
            figure.textContent = null;
        });
    }

    fadeIn(id: number, number: string): void {
        this.figures[id].style.opacity = '1';
        this.figures[id].textContent = number + 1;
        this.figures.forEach(figure => figure.disabled = true);
        this.tipHeader.textContent = 'Showing...';
    }

    start(): void {
        this.startButton.textContent = 'Stop';
    }

    pause(): void {
        this.fadeOut();
        this.figures.forEach(figure => {
            figure.disabled = false;
            figure.blur();
        });
        this.tipHeader.textContent = 'Your move';
    }

    stop(score: number): void {
        this.fadeOut();
        this.figures.forEach(figure => figure.disabled = true);
        this.tipHeader.textContent = 'Press start';
        this.tip.textContent = null;
        this.startButton.textContent = 'Start';
        this.scoreText.textContent = `${score}`;

        $('.modal').fadeIn(150).css('display', 'flex');
    }
}