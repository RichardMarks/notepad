import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, hashHistory } from 'react-router'

import Notepad from './Notepad'
import NotFound from './NotFound'

import './index.css'

const reactRoot = document.getElementById('root')

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Notepad} />
    <Route path='*' component={NotFound} />
  </Router>
), reactRoot)
