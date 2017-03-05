import React, {Component, PropTypes} from 'react'

import MainMenuBar from './MainMenuBar'
import DocumentView from './DocumentView'
import StatusBar from './StatusBar'

import './index.css'

export default class Notepad extends Component {
  constructor (props) {
    super(props)

    this.onKeyDown = this.onKeyDown.bind(this)

    this.state = {
      documentCursor: {
        row: 2,
        column: 5
      },
      documentContent: [
        'Hello, World!',
        'This is line two',
        'This is a third line of more text',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]
    }
  }

  componentDidMount () {
    this.topLevel.focus()
  }

  onKeyDown (event) {
    const {
      altKey,
      charCode,
      ctrlKey,
      key,
      keyCode,
      locale,
      location,
      metaKey,
      repeat,
      shiftKey,
      which
    } = event

    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}

    const cursorController = {
      moveToStartOfLine () {
        documentCursor.column = 0
      },
      moveToEndOfLine () {
        if (documentContent[documentCursor.row].length) {
          documentCursor.column = documentContent[documentCursor.row].length
        } else {
          documentCursor.column = 0
        }
      },
      moveToTopOfDocument () {
        documentCursor.row = 0
      },
      moveToBottomOfDocument () {
        documentCursor.row = documentContent.length - 1
      },
      moveUp () {
        documentCursor.row -= 1
        if (documentCursor.row < 0) {
          documentCursor.row = 0
        }
        if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
          cursorController.moveToEndOfLine()
        }
      },
      moveDown () {
        documentCursor.row += 1
        if (documentCursor.row > documentContent.length - 1) {
          documentCursor.row = documentContent.length - 1
        }
        if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
          cursorController.moveToEndOfLine()
        }
      },
      moveLeft () {
        documentCursor.column -= 1
        if (documentCursor.column < 0) {
          if (documentCursor.row > 0) {
            cursorController.moveUp()
            cursorController.moveToEndOfLine()
          } else {
            cursorController.moveToStartOfLine()
          }
        }
      },
      moveRight () {
        documentCursor.column += 1
        if (documentCursor.column > documentContent[documentCursor.row].length) {
          if (documentCursor.row < documentContent.length - 1) {
            cursorController.moveDown()
            cursorController.moveToStartOfLine()
          } else {
            cursorController.moveToEndOfLine()
          }
        }
      }
    }

    const KEY = {
      END: 35,
      HOME: 36,
      LEFT: 37,
      RIGHT: 39,
      UP: 38,
      DOWN: 40
    }

    const CURSOR_KEYS = [
      KEY.UP,
      KEY.DOWN,
      KEY.LEFT,
      KEY.RIGHT
    ]

    const isKey = (keyMatch) => keyCode === keyMatch

    let updateCursor = false

    if (CURSOR_KEYS.indexOf(keyCode) !== -1) {
      updateCursor = true
    }

    if (isKey(KEY.END)) {
      event.preventDefault()
      cursorController.moveToEndOfLine()
    } else if (isKey(KEY.HOME)) {
      event.preventDefault()
      cursorController.moveToStartOfLine()
    } else if (isKey(KEY.LEFT)) {
      if (metaKey) {
        cursorController.moveToStartOfLine()
      } else {
        cursorController.moveLeft()
      }
    } else if (isKey(KEY.RIGHT)) {
      if (metaKey) {
        cursorController.moveToEndOfLine()
      } else {
        cursorController.moveRight()
      }
    } else if (isKey(KEY.DOWN)) {
      if (metaKey) {
        cursorController.moveToBottomOfDocument()
      } else {
        cursorController.moveDown()
      }
    } else if (isKey(KEY.UP)) {
      if (metaKey) {
        cursorController.moveToTopOfDocument()
      } else {
        cursorController.moveUp()
      }
    }

    const nextState = {}

    if (updateCursor) {
      nextState.documentCursor = documentCursor
    }

    this.setState(nextState)


    const props = {
      altKey,
      charCode,
      ctrlKey,
      key,
      keyCode,
      locale,
      location,
      metaKey,
      repeat,
      shiftKey,
      which
    }

    const report = Object.keys(props).map(name => {
      const value = props[name]
      return `${name}: ${value},`
    })

    report[report.length - 1] = report[report.length - 1].substr(0, report[report.length - 1].length - 2)

    report.splice(0, 0, '{')
    report.push('}')

    console.log(JSON.parse(JSON.stringify(report.join(''))))
  }

  render () {
    return (
      <div
        className='top-level-window'
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        ref={(element) => { this.topLevel = element }}
        >
        <div className='notepad__header'>Notepad v1.0 - Untitled.txt</div>
        <div className='notepad__main-container'>
          <div className='notepad__menu-bar-container'>
            <MainMenuBar {...this.props} />
          </div>
          <div className='notepad__document-container'>
            <DocumentView
              content={this.state.documentContent}
              cursor={this.state.documentCursor}
              {...this.props}
            />
          </div>
          <div className='notepad__status-container'>
            <StatusBar
              cursor={this.state.documentCursor}
              {...this.props}
            />
          </div>
        </div>
      </div>
    )
  }
}

Notepad.propTypes = {
  params: PropTypes.object
}
