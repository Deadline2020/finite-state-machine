class FSM {

  constructor(config) {
    if (!config) throw new Error("config is missing");
    this.initialState = config.initial;
    this.states = config.states;
    this.state = this.initialState;
    this.historyPast = [];
    this.historyFuture = [];
  }

  getState() {
    return this.state;
  }

  changeState(state) {
    if (state in this.states) {
      this.historyPast.push(this.state);
      this.state = state;
      this.historyFuture = [];
    } else {
      throw new Error("This state isn't exist")
    }
  }

  trigger(event) {
    let newState = this.states[this.state].transitions[event];
    if (newState) {
      this.changeState(newState);
    } else {
      throw new Error("This event isn't exist");
    }
  }

  reset() {
    this.changeState(this.initialState);
  }

  getStates(event) {
    if (!event) {
      return Object.keys(this.states);
    }
    return Object.keys(this.states).filter((item) => {
      return this.states[item].transitions[event] ? true : false
    })
  }

  undo() {
    if (!this.historyPast.length) {
      return false;
    }
    this.historyFuture.push(this.state);
    this.state = this.historyPast.pop();
    return true;
  }

  redo() {
    if (!this.historyFuture.length) {
      return false;
    }
    this.historyPast.push(this.state);
    this.state = this.historyFuture.pop();
    return true;
  }

  clearHistory() {
    this.historyFuture = [];
    this.historyPast = [];
  }
}

module.exports = FSM;


