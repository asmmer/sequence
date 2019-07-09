import $ from 'jquery';

export default class View {
    constructor() {
        this.box = document.querySelector('.box');
        this.figures = this.box.querySelectorAll(':scope > .item');
        this.startButton = document.querySelector('#button_start');
        this.tipHeader = document.querySelector('.tip-header');
        this.tip = document.querySelector('.tip');
        this.scoreText = document.querySelector('.score-text');

        const actionsConfig = [
            {
                actionName: 'enable',
                callback: (e) => {
                    const { counter } = e.detail;
                    this.fadeIn(counter);
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
                callback: (e) => {
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
                callback: (e) => {
                    const { val1, val2 } = e.detail;
                    this.setTip(val1, val2);
                }
            }
        ]

        this.initActions(actionsConfig);
    }

    initActions(actionsConfig = []) {
        for (let key in actionsConfig) {
            const action = actionsConfig[key];
            const { actionName, callback } = action;
            document.addEventListener(actionName, callback);
        }
    }

    setTip(val1, val2) {
        this.tip.textContent = `${val1} / ${val2}`;
    }

    fadeOut() {
        this.figures.forEach(figure => figure.removeAttribute('style'));
    }

    fadeIn(counter) {
        this.figures[counter].style.opacity = '1';
        this.figures.forEach(figure => figure.disabled = true);
        this.tipHeader.textContent = 'Showing...';
    }

    start() {
        this.startButton.textContent = 'Stop';
    }

    pause() {
        this.fadeOut();
        this.figures.forEach(figure => {
            figure.disabled = false;
            figure.blur();
        });
        this.tipHeader.textContent = 'Your move';
    }

    stop(score) {
        this.fadeOut();
        this.figures.forEach(figure => figure.disabled = true);
        this.tipHeader.textContent = 'Press start';
        this.tip.textContent = null;
        this.startButton.textContent = 'Start';
        this.scoreText.textContent = `${score}`;

        $('.modal').fadeIn(150).css('display', 'flex');
    }
}