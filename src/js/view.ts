// @ts-ignore
import GameAction from "./game-action.ts";

import * as $ from "jquery";

export default class View {
    readonly box: HTMLDivElement = document.querySelector('.box-container');
    readonly figures: NodeListOf<HTMLButtonElement> = this.box.querySelectorAll(':scope > .box-item');
    readonly startButton: HTMLButtonElement = document.querySelector('#button_start');
    readonly tipHeader: HTMLDivElement = document.querySelector('.tips-container__tip-header');
    readonly tip: HTMLDivElement = document.querySelector('.tips-container__tip');
    readonly scoreText: HTMLDivElement = document.querySelector('.score-text');

    constructor() {
        const actions: GameAction[] = [
            new GameAction({
                name: 'enable',
                callback: (e: any) => {
                    const { id, number } = e.detail;
                    this.fadeIn(id, number);
                }
            }),
            new GameAction({
                name: 'disable',
                callback: () => this.fadeOut()
            }),
            new GameAction({
                name: 'start',
                callback: () => this.start()
            }),
            new GameAction({
                name: 'stop',
                callback: (e: any) => {
                    const { score } = e.detail;
                    this.stop(score);
                }
            }),
            new GameAction({
                name: 'pause',
                callback: () => this.pause()
            }),
            new GameAction({
                name: 'set-tip',
                callback: (e: any) => {
                    const { currentLength, wholeLength } = e.detail;
                    this.setTip(currentLength, wholeLength);
                }
            })
        ];

        this.initGameActions(actions);
    }

    initGameActions(gameActions: GameAction[]): void {
        gameActions.forEach(gameAction => {
            const { name, callback }: GameAction = gameAction;
            document.addEventListener(name, callback);
        });
    }

    setTip(currentLength: number, wholeLength: number): void {
        this.tip.textContent = `${currentLength} / ${wholeLength}`;
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