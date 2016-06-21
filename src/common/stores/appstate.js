import { observable, action } from 'mobx';

export default class AppState {
    
  @observable items = [];

  constructor(initialState) {
    this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
  }
  
  @action
  addItem(item) {
    this.items.push(item);
  }
  
  toJson() {
    return {
      items: this.items
    };
  }
}

