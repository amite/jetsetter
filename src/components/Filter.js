import React, { Component } from 'react'

import './Filter.css'
import { func, string } from 'prop-types'

class Filter extends Component {
  static propTypes = {
    onChange: func.isRequired,
    searchTerm: string.isRequired
  }
  handleChange = event => {
    const { onChange } = this.props
    const value = event.target.value
    onChange(value)
  }

  render() {
    const { searchTerm } = this.props
    return (
      <input
        className="Items-searchTerm"
        value={searchTerm}
        onChange={this.handleChange}
      />
    )
  }
}

export default Filter
