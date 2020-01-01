interface IGameEvent {
    type: string;
    selector: string;
    callback: EventListenerOrEventListenerObject;
}

export default class GameEvent implements IGameEvent {
    type: string;
    selector: string;
    callback: EventListenerOrEventListenerObject;

    constructor(options: IGameEvent) {
        const { type, selector, callback } = options;

        this.type = type;
        this.selector = selector;
        this.callback = callback;
    }
}