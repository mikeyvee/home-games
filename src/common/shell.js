import React from 'react'
import './shell.css'

export default class ShellView extends React.Component {
  render () {
    return (
      <div className="Shell">
        { this.props.children }
      </div>
    )
  }
}
