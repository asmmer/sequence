import $ from 'jquery';
import Game from './game.js';

export default class Controller {

    constructor(model, view) {

        this.game = new Game();

        this.model = model;
        this.view = view;

        const config = [
            {
                eventName: 'click',
                dataAction: '[data-action="game:start"]',
                callback: (e) => {
                    if (!this.game.isStarted) {
                        this.game.start();
                    } else {
                        this.game.stop();
                    }
                }
            },
            {
                eventName: 'click',
                dataAction: '[data-action="figure:set"]',
                callback: (e) => {
                    $(e.target).css('opacity', '.3');
                    if (this.game.isStarted && this.game.isPaused) {
                        this.game.getPlayerSequence($(view.figures).index(e.target));
                    }
                }
            },
            {
                eventName: 'mousemove',
                dataAction: '[data-action="figure:set"]',
                callback: (e) => {
                    if (this.game.isStarted && this.game.isPaused) {
                        $(e.target).css('opacity', '1');
                    }
                }
            },
            {
                eventName: 'mouseout',
                dataAction: '[data-action="figure:set"]',
                callback: (e) => {
                    if (this.game.isStarted && this.game.isPaused) {
                        $(e.target).css('opacity', '.3');
                    }
                }
            },
            {
                eventName: 'click',
                dataAction: '[data-action="modal:close"]',
                callback: (e) => {
                    $('.modal').fadeOut(150);
                }
            }
        ]

        this.initDataActions(config);

    }

    initDataActions(config) {
        for (let event in config) {
            $(document).on(config[event].eventName, config[event].dataAction, config[event].callback);
        }
    }

} 