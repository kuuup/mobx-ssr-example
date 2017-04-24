/* @flow */
import { observable, action, autorun } from 'mobx';
import io from 'socket.io-client';

export default class AppState<Item> {

    @observable items: Array<Item> = [];

    socket = null;

    constructor(initialState?: { appstate: AppState<Item> }) {
        this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
        if(typeof window === 'object') {
            this.socket = io.connect('http://localhost:3000/')
            this.socket.on('update-from-server', data => this.addRemoteItem(data));
        }
    }

    @action
    addItem(item: Item) {
        this.items.push(item);
        if(this.socket) this.socket.emit('update-from-client', item);
    }

    @action
    addRemoteItem(item: Item) {
        this.items.push(item);
    }

    toJson() {
        return {
            items: this.items
        };
    }
}
