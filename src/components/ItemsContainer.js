import React, { Component } from 'react'
import Items from './Items'

class ItemsContainer extends Component {
  state = {
    searchTerm: ''
  }

  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm })
  }

  render() {
    return (
      <Items
        searchTerm={this.state.searchTerm}
        onSearchTermChange={this.updateSearchTerm}
        {...this.props}
      />
    )
  }
}

export default ItemsContainer
