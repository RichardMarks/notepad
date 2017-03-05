import React, {Component, PropTypes} from 'react'

import './index.css'

export default class DocumentView extends Component {
  constructor (props) {
    super(props)

    this.renderContentRow = this.renderContentRow.bind(this)
    this.renderContentColumn = this.renderContentColumn.bind(this)
  }

  renderContentRow (contentRow, row) {
    const { cursor } = this.props

    const rowWithEOL = `${contentRow}${String.fromCharCode(0xA0)}`
    let content = rowWithEOL.split('').map((contentColumn, column) => this.renderContentColumn(contentColumn, column, row))
    if (contentRow.length === 0) {
      content = this.renderContentColumn(' ', 0, row)
    }

    if (cursor.row === row) {
      return (
        <div key={row} className='document-view__row document-view__row--highlight'>
          <div className='document-view__line-number'>{1 + row}</div>
          {content}
        </div>
      )
    } else {
      return (
        <div key={row} className='document-view__row'>
          <div className='document-view__line-number'>{1 + row}</div>
          {content}
        </div>
      )
    }
  }

  renderContentColumn (contentColumn, column, row) {
    const { cursor } = this.props

    let glyph = contentColumn
    if (contentColumn === ' ') {
      glyph = String.fromCharCode(0xA0)
    }

    if (cursor.row === row && cursor.column === column) {
      return (
        <div key={column} className='document-view__column document-view__cursor'>
          {glyph}
        </div>
      )
    } else {
      return (
        <div key={column} className='document-view__column'>
          {glyph}
        </div>
      )
    }
  }

  render () {
    const { content } = this.props

    return (
      <div className='document-view'>
        {content.map(this.renderContentRow)}
      </div>
    )
  }
}

DocumentView.propTypes = {
  content: PropTypes.array.isRequired,
  cursor: PropTypes.object.isRequired
}
