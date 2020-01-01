interface IGameAction {
    name: string;
    callback: EventListenerOrEventListenerObject;
}

export default class GameAction implements IGameAction {
    name: string;
    callback: EventListenerOrEventListenerObject;

    constructor(options: IGameAction) {
        const { name, callback } = options;

        this.name = name;
        this.callback = callback;
    }
}