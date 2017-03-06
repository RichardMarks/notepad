import React, {PropTypes} from 'react'

import './index.css'

export default function StatusBar (props) {
  const currentRow = props.cursor.row
  const currentColumn = props.cursor.column
  const totalRows = props.content.length
  const totalColumns = props.content[props.cursor.row].length
  const characterCount = props.content.reduce((total, row) => {
    return total + row.length
  }, 0)
  const characterPosition = props.content.slice(0, props.cursor.row).reduce((total, row) => {
    return total + row.length
  }, 0) + props.cursor.column

  const sections = [
    {
      content (section) {
        return (
          <div className='status-bar__section'>
            Line {1 + currentRow}/{totalRows}, Column {1 + currentColumn}/{totalColumns}
          </div>
        )
      }
    },
    {
      content (section) {
        return (
          <div className='status-bar__section'>
            {1 + characterPosition}/{characterCount} chars
          </div>
        )
      }
    },
    {
      content (section) {
        return (
          <div className='status-bar__section'>
            * not saved
          </div>
        )
      }
    }
  ]

  return (
    <div className='status-bar'>
      {sections.map((section, index) => (
        <div
          className='status-bar__section'
          key={index}>
          {section.content(section)}
        </div>
      ))}
    </div>
  )
}

StatusBar.propTypes = {
  content: PropTypes.array.isRequired,
  cursor: PropTypes.object.isRequired
}
