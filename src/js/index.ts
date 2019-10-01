// @ts-ignore
import Model from './model.ts';
// @ts-ignore
import View from './view.ts';
// @ts-ignore
import Controller from './controller.ts';

const model: Model = new Model();
const view: View = new View();

const controller: Controller = new Controller(model, view);
