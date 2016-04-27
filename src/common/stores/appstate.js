import { observable } from 'mobx';

export default class AppState {
    
  @observable 
  items = [];

  constructor() {
    this.addItem = this.addItem.bind(this);
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  static fromJS(state) {
    const appState = new AppState();
    appState.items = state.appstate.items;
    return appState;
  }
}
