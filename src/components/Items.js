import React, { Component } from 'react'
import Item from './Item'
import Filter from './Filter'
import Search from './Search'

class Items extends Component {
  static displayName = 'Items'

  renderItems = ({ items, searchTerm, onToggle, onRemove }) =>
    items
      .filter(({ value }) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(item => (
        <Item
          key={item.id}
          onToggle={onToggle}
          onRemove={onRemove}
          item={item}
        />
      ))

  render() {
    const { title, items } = this.props
    return (
      <Search
        render={({ searchTerm, updateSearchTerm }) => (
          <section className="Items">
            <h2>
              {title} ({items.length})
            </h2>
            <Filter searchTerm={searchTerm} onChange={updateSearchTerm} />
            {this.renderItems({ ...this.props, searchTerm })}
          </section>
        )}
      />
    )
  }
}

export default Items
