class SRStore {

  constructor () {
    this.state = this.initialState()
    this.listeners = {}
    this.components = {}
  }

  initialState () {
    return {}
  }

  addListener (keys, listener) {
    keys.forEach(key => {
      if (!this.listeners[key]) {
        this.listeners[key] = []
      }
      this.listeners[key].push(listener)
    })
  }

  addListenerComponent (keys, component) {
    const state = {}
    keys.forEach(key => {
      if (!this.components[key]) {
        this.components[key] = []
      }
      this.components[key].push(component)

      state[key] = this.state[key]
    })
    component.setState(state)
  }

  removeListener (keys, listener) {
    keys.forEach(key => {
      if (this.listeners[key]) {
        const index = this.listeners[key].indexOf(listener)
        this.listeners[key].splice(index, 1)
      }
    })
  }

  removeListenerComponent (keys, component) {
    keys.forEach(key => {
      if (this.components[key]) {
        const index = this.components[key].indexOf(component)
        this.components[key].splice(index, 1)
      }
    })
  }

  setValue (key, value) {
    const dict = {}
    dict[key] = value
    this.setValues(dict)
  }

  setValues (dict) {
    const listenersToCall = []
    const componentsToUpdate = []
    Object.keys(dict).forEach(key => {
      if (this.listeners[key] && listenersToCall.indexOf(this.listeners[key]) < 0) {
        listenersToCall.push(this.listeners[key])
      }
      if (this.components[key]) {
        this.components[key].forEach(component => {
          const compAndState = componentsToUpdate.find(compAndState => compAndState.component === component)
          if (!compAndState) {
            const state = {}
            state[key] = dict[key]
            componentsToUpdate.push({component: component, state})
          }
          else {
            compAndState.state[key] = dict[key]
          }
        })
      }
      this.state[key] = dict[key]
    })
    listenersToCall.forEach(listener => listener())
    componentsToUpdate.forEach(componentAndState => {
      componentAndState.component.setState(componentAndState.state)
    })
  }

  getValue (key) {
    return this.state[key]
  }

}

export default SRStore
