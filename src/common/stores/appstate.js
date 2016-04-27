import { observable } from 'mobx';

export default class AppState {
    
  @observable items;

  constructor(initialState) {
    this.items = initialState ? initialState.appstate.items : [];
    this.addItem = this.addItem.bind(this);
  }

  addItem(item) {
    this.items.push(item);
  }
  
}
