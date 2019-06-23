import $ from 'jquery';

export default class View {

    constructor() {

        this.box = document.querySelector('.box');
        this.figures = this.box.querySelectorAll(':scope > .item');
        this.startButton = document.querySelector('#button_start');
        this.tipTitle = document.querySelector('.tip-title');
        this.scoreText = document.querySelector('.score-text');

        const actionsConfig = [
            {
                actionName: 'enable',
                callback: (e) => {
                    const { counter, num } = e.detail;
                    this.enable(counter, num);
                }
            },
            {
                actionName: 'disable',
                callback: () => {
                    this.disable();
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

    disable() {
        this.figures.forEach(figure => figure.style.opacity = '.3');
    }

    enable(counter, num) {
        this.figures[counter].style.opacity = '1';
        this.tipTitle.textContent = `${num}`;
    }

    start() {
        this.startButton.textContent = 'Stop';
    }

    pause() {
        this.disable();
        this.tipTitle.textContent = 'Your move';
    }

    stop(score) {
        this.disable();
        this.tipTitle.textContent = 'Press start';
        this.startButton.textContent = 'Start';
        this.scoreText.textContent = `${score}`;

        $('.modal').fadeIn(150).css('display', 'flex');
    }
}