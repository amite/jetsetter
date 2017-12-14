import React, { Component } from 'react'

const withSearch = WrappedComponent =>
  class extends Component {
    static displayName = `WithSearch(${WrappedComponent.displayName})`
    state = {
      searchTerm: ''
    }

    updateSearchTerm = searchTerm => {
      this.setState({ searchTerm })
    }

    render() {
      return (
        <WrappedComponent
          onSearchTermChange={this.updateSearchTerm}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

export default withSearch
