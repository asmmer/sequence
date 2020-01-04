// @ts-ignore
import Model, { GameState } from './model.ts';
import View from './view';

// @ts-ignore
import GameEvent from "./game-event.ts";

import * as $ from "jquery";

interface IController {
    model: Model;
    view: View;
}

export default class Controller implements IController {
    readonly model: Model;
    readonly view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;

        const gameEvents: GameEvent[] = [
            new GameEvent({
                type: 'click',
                selector: '[data-action="model:start"]',
                callback: () => {
                    switch (this.model.gameState) {
                        case GameState.Stopped: 
                        case GameState.Paused: this.model.start(); break;
                        case GameState.Started: this.model.stop(); break;
                    }
                }
            }),
            new GameEvent({
                type: 'click',
                selector: '[data-action="figure:set"]',
                callback: ({ target }: any) => {
                    if (this.model.gameState === GameState.Paused) {
                        const index = Array.prototype.slice.call(view.figures).indexOf(target);
                        this.model.getPlayerSequence(index);
                    }
                }
            }),
            new GameEvent({
                type: 'click',
                selector: '[data-action="modal:close"]',
                callback: () => {
                    $('.modal').fadeOut(150);
                }
            })
        ]

        this.initGameEvents(gameEvents);
    }

    private initGameEvents(gameEvents: GameEvent[]): void {
        gameEvents.forEach(event => {
            const { type, selector, callback }: GameEvent = event;
            const targets = document.querySelectorAll(selector);
            targets.forEach(target => target.addEventListener(type, callback));
        });
    }
} 