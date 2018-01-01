import React from 'react'

class SRComponent extends React.Component {

  componentWillMount () {
    if (this.store && this.storeKeys) {
      this.store.addListenerComponent(this.storeKeys, this)
    }
  }

  componentWillUnmount () {
    if (this.store && this.storeKeys) {
      this.store.removeListenerComponent(this.storeKeys, this)
    }
  }

}

export default SRComponent
