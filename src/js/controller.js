import $ from 'jquery';

export default class Controller {

    constructor(model, view) {

        this.model = model;
        this.view = view;

        const config = [
            {
                type: 'click',
                selector: '[data-action="model:start"]',
                callback: (e) => {
                    if (!this.model.isStarted) {
                        this.model.start();
                    } else {
                        this.model.stop();
                    }
                }
            },
            {
                type: 'click',
                selector: '[data-action="figure:set"]',
                callback: (e) => {
                    const { target } = e;
                    target.style.opacity = '.3';
                    if (this.model.isStarted && this.model.isPaused) {
                        const index = Array.prototype.slice.call(view.figures).indexOf(target);          
                        this.model.getPlayerSequence(index);
                    }
                }
            },
            {
                type: 'mousemove',
                selector: '[data-action="figure:set"]',
                callback: (e) => {
                    if (this.model.isStarted && this.model.isPaused) {
                        const { target } = e;
                        target.style.opacity = '1';
                    }
                }
            },
            {
                type: 'mouseout',
                selector: '[data-action="figure:set"]',
                callback: (e) => {
                    if (this.model.isStarted && this.model.isPaused) {
                        const { target } = e;
                        target.style.opacity = '.3';
                    }
                }
            },
            {
                type: 'click',
                selector: '[data-action="modal:close"]',
                callback: (e) => {
                    $('.modal').fadeOut(150);
                }
            }
        ]

        this.initActions(config);
    }

    initActions(config) {
        config.forEach(event => {
            const { type, selector, callback} = event;
            const targets = document.querySelectorAll(selector);
            targets.forEach(target => target.addEventListener(type, callback));
        });
    }

} 