/* @flow */
import { observable, action } from 'mobx';

export default class AppState<Item> {

    @observable items: Array<Item> = [];

    constructor(initialState?: { appstate: AppState<Item> }) {
        this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
    }

    @action
    addItem(item: Item) {
        this.items.push(item);
    }

    toJson() {
        return {
            items: this.items
        };
    }
}
