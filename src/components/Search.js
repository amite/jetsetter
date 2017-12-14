import React, { Component } from 'react'

class Search extends Component {
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
