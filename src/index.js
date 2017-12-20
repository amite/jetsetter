import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import JetSetter from './components/Application'

import './index.css'

ReactDOM.render(<JetSetter />, document.getElementById('root'))
