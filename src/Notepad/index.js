import React, {Component, PropTypes} from 'react'

import MainMenuBar from './MainMenuBar'
import DocumentView from './DocumentView'
import StatusBar from './StatusBar'

import './index.css'

const mockData = [
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

const CURSOR_HOME = { row: 0, column: 0 }

const KEY = {
  END: 35,
  HOME: 36,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13
}

const CURSOR_KEYS = [
  KEY.UP,
  KEY.DOWN,
  KEY.LEFT,
  KEY.RIGHT
]

export default class Notepad extends Component {
  constructor (props) {
    super(props)

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)

    this.moveToStartOfLine = this.moveToStartOfLine.bind(this)
    this.moveToEndOfLine = this.moveToEndOfLine.bind(this)
    this.moveToTopOfDocument = this.moveToTopOfDocument.bind(this)
    this.moveToBottomOfDocument = this.moveToBottomOfDocument.bind(this)
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.insertCarriageReturn = this.insertCarriageReturn.bind(this)
    this.insertBackspace = this.insertBackspace.bind(this)
    this.insertCharacter = this.insertCharacter.bind(this)

    this.state = {
      documentCursor: CURSOR_HOME,
      documentContent: mockData
    }
  }

  componentDidMount () {
    this.topLevel.focus()
  }

  moveToStartOfLine (documentCursor, documentContent) {
    documentCursor.column = 0
  }

  moveToEndOfLine (documentCursor, documentContent) {
    if (documentContent[documentCursor.row].length) {
      documentCursor.column = documentContent[documentCursor.row].length
    } else {
      documentCursor.column = 0
    }
  }

  moveToTopOfDocument (documentCursor, documentContent) {
    documentCursor.row = 0
    documentCursor.column = 0
  }

  moveToBottomOfDocument (documentCursor, documentContent) {
    documentCursor.row = documentContent.length - 1
    documentCursor.column = 0
  }

  moveUp (documentCursor, documentContent) {
    documentCursor.row -= 1
    if (documentCursor.row < 0) {
      documentCursor.row = 0
    }
    if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
      this.moveToEndOfLine(documentCursor, documentContent)
    }
  }

  moveDown (documentCursor, documentContent) {
    documentCursor.row += 1
    if (documentCursor.row > documentContent.length - 1) {
      documentCursor.row = documentContent.length - 1
    }
    if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
      this.moveToEndOfLine(documentCursor, documentContent)
    }
  }

  moveLeft (documentCursor, documentContent) {
    documentCursor.column -= 1
    if (documentCursor.column < 0) {
      if (documentCursor.row > 0) {
        this.moveUp(documentCursor, documentContent)
        this.moveToEndOfLine(documentCursor, documentContent)
      } else {
        this.moveToStartOfLine(documentCursor, documentContent)
      }
    }
  }

  moveRight (documentCursor, documentContent) {
    documentCursor.column += 1
    if (documentCursor.column > documentContent[documentCursor.row].length) {
      if (documentCursor.row < documentContent.length - 1) {
        this.moveDown(documentCursor, documentContent)
        this.moveToStartOfLine(documentCursor, documentContent)
      } else {
        this.moveToEndOfLine(documentCursor, documentContent)
      }
    }
  }

  insertCarriageReturn (documentCursor, documentContent) {
    if (documentCursor.row === documentContent.length - 1) {
      documentContent.push('FOP')
      // this.moveDown(documentCursor, documentContent)
      documentCursor.column = 0
    } else {
      documentContent.splice(documentCursor.row + 1, 0, '')
    }
  }

  insertBackspace (documentCursor, documentContent) {
    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    if (documentCursor.column > 0) {
      documentCursor.column -= 1

      const rowContent = documentContent[documentCursor.row]
      const pre = rowContent.slice(0, documentCursor.column)
      const post = rowContent.slice(documentCursor.column + 1)
      changeRow(`${pre}${post}`)
    }
  }

  insertCharacter (character, documentCursor, documentContent) {
    const rowContent = documentContent[documentCursor.row]

    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    if (documentCursor.column === 0) {
      changeRow(`${character}${rowContent}`)
    } else if (documentCursor.column === rowContent.length - 1) {
      changeRow(`${rowContent}${character}`)
    } else {
      const pre = rowContent.slice(0, documentCursor.column)
      const post = rowContent.slice(documentCursor.column)
      changeRow(`${pre}${character}${post}`)
    }
  }

  onKeyPress (event) {
    console.log('onKeyPress')
    console.log({...event})

    const {
      // altKey,
      // ctrlKey,
      // key,
      // locale,
      // location,
      // metaKey,
      // repeat,
      // which,
      charCode,
      keyCode,
      shiftKey
    } = event

    let updateDocument = false

    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}

    if (charCode === KEY.ENTER) {
      updateDocument = true
      this.insertCarriageReturn(documentCursor, documentContent)
    } else if (charCode && !keyCode) {
      updateDocument = true
      const character = String.fromCharCode(charCode)
      this.insertCharacter(shiftKey
        ? character.toUpperCase()
        : character,
        documentCursor, documentContent)
      documentCursor.column += 1
    }

    if (updateDocument) {
      this.setState({ documentContent, documentCursor })
    }
  }

  onKeyDown (event) {
    console.log('onKeyDown')
    console.log({...event})
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()

    let updateCursor = false
    let updateDocument = false

    const moveToStartOfLine = () => this.moveToStartOfLine(documentCursor, documentContent)
    const moveToEndOfLine = () => this.moveToEndOfLine(documentCursor, documentContent)
    const moveToTopOfDocument = () => this.moveToTopOfDocument(documentCursor, documentContent)
    const moveToBottomOfDocument = () => this.moveToBottomOfDocument(documentCursor, documentContent)
    const moveUp = () => this.moveUp(documentCursor, documentContent)
    const moveDown = () => this.moveDown(documentCursor, documentContent)
    const moveLeft = () => this.moveLeft(documentCursor, documentContent)
    const moveRight = () => this.moveRight(documentCursor, documentContent)

    const {
      // altKey,
      // charCode,
      // ctrlKey,
      // key,
      // locale,
      // location,
      // repeat,
      // shiftKey,
      // which,
      keyCode,
      metaKey
    } = event

    const isKey = (keyMatch) => keyCode === keyMatch

    if (CURSOR_KEYS.indexOf(keyCode) !== -1) {
      updateCursor = true
    }

    if (isKey(KEY.BACKSPACE)) {
      event.preventDefault()
      this.insertBackspace(documentCursor, documentContent)
      updateCursor = true
      updateDocument = true
    } else if (isKey(KEY.END)) {
      event.preventDefault()
      moveToEndOfLine()
      updateCursor = true
    } else if (isKey(KEY.HOME)) {
      event.preventDefault()
      moveToStartOfLine()
      updateCursor = true
    } else if (isKey(KEY.LEFT)) {
      if (metaKey) {
        moveToStartOfLine()
      } else {
        moveLeft()
      }
    } else if (isKey(KEY.RIGHT)) {
      if (metaKey) {
        moveToEndOfLine()
      } else {
        moveRight()
      }
    } else if (isKey(KEY.DOWN)) {
      if (metaKey) {
        moveToBottomOfDocument()
      } else {
        moveDown()
      }
    } else if (isKey(KEY.UP)) {
      if (metaKey) {
        moveToTopOfDocument()
      } else {
        moveUp()
      }
    }

    const nextState = {}

    if (updateDocument) {
      nextState.documentContent = documentContent
    }

    if (updateCursor) {
      nextState.documentCursor = documentCursor
    }

    this.setState(nextState)
  }

  render () {
    return (
      <div
        className='top-level-window'
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.onKeyPress}
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
