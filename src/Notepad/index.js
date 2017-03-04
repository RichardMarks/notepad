import React, {Component, PropTypes} from 'react'

import MainMenuBar from './MainMenuBar'
import DocumentView from './DocumentView'
import StatusBar from './StatusBar'

import './index.css'

export default class Notepad extends Component {
  render () {
    return (
      <div className='top-level-window'>
        <div className='notepad__header'>Notepad v1.0 - Untitled.txt</div>
        <div className='notepad__main-container'>
          <div className='notepad__menu-bar-container'>
            <MainMenuBar {...this.props} />
          </div>
          <div className='notepad__document-container'>
            <DocumentView {...this.props} />
          </div>
          <div className='notepad__status-container'>
            <StatusBar {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

Notepad.propTypes = {
  params: PropTypes.object
}
