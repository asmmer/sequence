import * as $ from "jquery";

import Model from './model';
import View from './view';

interface IEvent {
    type: string,
    selector: string,
    callback: EventListenerOrEventListenerObject
}

/**
 * Class for model and view control.
 */
export default class Controller {
    readonly model: Model;
    readonly view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;

        const config: Array<IEvent> = [
            {
                type: 'click',
                selector: '[data-action="model:start"]',
                callback: () => {
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
                callback: ({ target }: Event) => {
                    if (this.model.isStarted && this.model.isPaused) {
                        const index = Array.prototype.slice.call(view.figures).indexOf(target);
                        this.model.getPlayerSequence(index);
                    }
                }
            },
            {
                type: 'click',
                selector: '[data-action="modal:close"]',
                callback: () => {
                    $('.modal').fadeOut(150);
                }
            }
        ]

        this.initActions(config);
    }

    initActions(config: Array<IEvent>): void {
        config.forEach(event => {
            const { type, selector, callback }: IEvent = event;
            const targets = document.querySelectorAll(selector);
            targets.forEach(target => target.addEventListener(type, callback));
        });
    }
} 