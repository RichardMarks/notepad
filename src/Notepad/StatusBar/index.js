import React, {PropTypes} from 'react'

import './index.css'

export default function StatusBar (props) {
  const sections = [
    {
      content (section) {
        return (
          <div className='status-bar__section'>
            Line {1 + props.cursor.row}, Column {1 + props.cursor.column}
          </div>
        )
      }
    },
    {
      content (section) {
        return (
          <div className='status-bar__section'>
            {String.fromCharCode(0xA0)}
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
  cursor: PropTypes.object.isRequired
}
