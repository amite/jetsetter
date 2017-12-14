import React, { Component } from 'react'
import Item from './Item'
import Filter from './Filter'
import withSearch from '../hocs/withSearch'

class Items extends Component {
  render() {
    const {
      title,
      items,
      onToggle,
      onRemove,
      searchTerm,
      onSearchTermChange
    } = this.props
    return (
      <section className="Items">
        <h2>
          {title} ({items.length})
        </h2>
        <Filter searchTerm={searchTerm} onChange={onSearchTermChange} />
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
    )
  }
}

export default withSearch(Items)
