# Simplified Reflux
_A Reflux-like state store without actions for React_

## Getting Started 
Install from NPM:
    
    yarn add simplified-reflux
    
Implement a local store class `Store.js`:
    
    import {SRStore} from 'simplified-reflux'
    export default new SRStore()
    
Derive your React component from `SRComponent`. 
Put the Store you just created to `this.store` and add all keys you need to `this.storeKeys`:

    import {SRComponent} from 'simplified-reflux'
    import Store from './Store'
     
    class Tickets extends SRComponent {
        
        constructor (props) {
            super(props)
            
            this.store = Store
            this.storeKeys = ['language']
        }
        
        render () {
            return (
                <div>Chosen language: {this.state.language}</div>
            )
        }
       
    }
    
A derived class automatically registers for changes of the `stateKeys` variables in the store
which are put to `this.state.*`.

## Update Values
Updating values is easy:
    
    Store.setValues(dict)
    
For example: 
   
    Store.setValues({
        language: 'English'
    })

## Usage outside of React components

If you need the store in a non-React class you have to register, unregister and retrieve the values manually:
Of course, you can register from other classes as well:

    Store.addListener(keys, listener)
    
while `key` is an array and `listener` is a function without params. To retrieve any value call

    Store.getValue(key)
    
Don't forget to remove your listener:
    
    Store.removeListener(keys, listener)
    
# License

MIT License

Copyright (c) 2018 Henry Moews

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
   