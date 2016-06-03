import { observable, action } from 'mobx';

export default class AppState {
    
  @observable items;

  constructor(initialState) {
    this.items = initialState ? initialState.appstate.items : [];
    this.addItem = this.addItem.bind(this);
  }

  @action
  addItem(item) {
    this.items.push(item);
  }
  
}
