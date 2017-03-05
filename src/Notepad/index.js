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

    if (keyCode === 37) {
      // left arrow
      const documentCursor = {...this.state.documentCursor}

      // move cursor left one space
      documentCursor.column -= 1

      // if off left
      if (documentCursor.column < 0) {
        // if we are not in the first row
        if (documentCursor.row > 0) {
          // move up a row
          documentCursor.row -= 1
          // move to end of line
          documentCursor.column = documentContent[documentCursor.row].length - 1
        } else {
          documentCursor.column = 0
        }
      }


      this.setState({ documentCursor })
    } else if (keyCode === 39) {
      // right arrow
      const documentCursor = {...this.state.documentCursor}

      // move cursor right one space
      documentCursor.column += 1

      // if off right
      if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
        // if we are not in the last row
        if (documentCursor.row < documentContent.length - 1) {
          // move down a row
          documentCursor.row += 1
          // move to start of line
          documentCursor.column = 0
        } else {
          documentCursor.column = documentContent[documentCursor.row].length - 1
        }
      }


      this.setState({ documentCursor })
    } else if (keyCode === 40) {
      // down arrow
      const documentCursor = {...this.state.documentCursor}

      // move cursor down one row
      documentCursor.row += 1

      // if off bottom
      if (documentCursor.row > documentContent.length - 1) {
        documentCursor.row = documentContent.length - 1
      }

      // if cursor is not in bounds of new row
      if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
        documentCursor.column = documentContent[documentCursor.row].length - 1
      }

      this.setState({ documentCursor })
    } else if (keyCode === 38) {
      // up arrow
      const documentCursor = {...this.state.documentCursor}

      // move cursor up one row
      documentCursor.row -= 1

      // if off top
      if (documentCursor.row < 0) {
        documentCursor.row = 0
      }

      // if cursor is not in bounds of new row
      if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
        documentCursor.column = documentContent[documentCursor.row].length - 1
      }

      this.setState({ documentCursor })
    }

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



    // documentContent.push(key)

    // this.setState(
    //   { documentContent }
    // )
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
