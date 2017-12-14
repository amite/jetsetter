import React, { Component } from 'react'
import Item from './Item'
import Filter from './Filter'
import Search from './Search'

class Items extends Component {
  static displayName = 'Items'

  render() {
    const { title, items, onToggle, onRemove } = this.props
    return (
      <Search
        render={({ searchTerm, updateSearchTerm }) => (
          <section className="Items">
            <h2>
              {title} ({items.length})
            </h2>
            <Filter searchTerm={searchTerm} onChange={updateSearchTerm} />
            {items
              .filter(item =>
                item.value.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(item => (
                <Item
                  key={item.id}
                  onToggle={onToggle}
                  onRemove={onRemove}
                  item={item}
                />
              ))}
          </section>
        )}
      />
    )
  }
}

export default Items
