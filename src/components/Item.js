import React, { Component } from 'react'
import { func, bool, shape, number, string } from 'prop-types'
import './Item.css'

class Item extends Component {
  static propTypes = {
    item: shape({
      id: number,
      packed: bool,
      value: string
    }),
    onToggle: func.isRequired,
    onRemove: func.isRequired
  }
  render() {
    const { item, onToggle, onRemove } = this.props
    return (
      <article className="Item">
        <label htmlFor={item.id}>
          <input
            type="checkbox"
            checked={item.packed}
            onChange={() => onToggle(item)}
            id={item.id}
          />
          {item.value}
        </label>
        <button className="Item-remove" onClick={() => onRemove(item)}>
          Remove
        </button>
      </article>
    )
  }
}

export default Item
