import React, { Component } from 'react'
import { func } from 'prop-types'

class Search extends Component {
  static propTypes = {
    render: func.isRequired
  }

  state = {
    searchTerm: ''
  }

  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm })
  }

  render() {
    return (
      <div className="Search">
        {this.props.render({
          searchTerm: this.state.searchTerm,
          updateSearchTerm: this.updateSearchTerm
        })}
      </div>
    )
  }
}

export default Search
