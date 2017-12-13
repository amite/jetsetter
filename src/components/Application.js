import React, { Component } from 'react'
import CountDown from './CountDown'
import NewItem from './NewItem'
import Items from './Items'

import api from '../lib/api'
import {
  markAllAsUnpacked,
  addItem,
  removeItem,
  toggleItem
} from '../lib/logic'

import './Application.css'

class Application extends Component {
  state = {
    items: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const items = await api.getAll()
    this.setState({
      items: items || [],
      loading: false
    })
  }

  toggleItem = async itemToToggle => {
    await api.update({ ...itemToToggle, packed: !itemToToggle.packed })
    this.setState(toggleItem(itemToToggle))
  }

  markAllAsUnpacked = async () => {
    await api.markAllAsUnpacked()
    this.setState(markAllAsUnpacked())
  }

  removeItem = async itemToRemove => {
    await api.delete(itemToRemove)
    this.setState(removeItem(itemToRemove))
  }

  addItem = async item => {
    if (item.value === '') return
    const newItem = await api.add(item)
    this.setState(addItem(newItem))
  }

  render() {
    // Get the items from state

    const { items, loading } = this.state
    const unpackedItems = items.filter(item => item.packed === false)
    const packedItems = items.filter(item => item.packed === true)

    return loading ? (
      <div>loading...</div>
    ) : (
      <div className="Application">
        <NewItem onSubmit={this.addItem} />
        <CountDown />
        <Items
          title="Unpacked Items"
          onToggle={this.toggleItem}
          onRemove={this.removeItem}
          items={unpackedItems}
        />
        <Items
          title="Packed Items"
          onToggle={this.toggleItem}
          onRemove={this.removeItem}
          items={packedItems}
        />
        <button className="button full-width" onClick={this.markAllAsUnpacked}>
          Mark All As Unpacked
        </button>
      </div>
    )
  }
}

export default Application
