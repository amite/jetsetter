import React, { Component } from 'react'
import api from '../lib/api'
import {
  markAllItemsAsUnpacked,
  addItem,
  removeItem,
  toggleItem
} from '../lib/logic'

const withItems = WrappedComponent =>
  class WithItems extends Component {
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
      try {
        await api.markAllAsUnpacked()
        this.setState(markAllItemsAsUnpacked())
      } catch (error) {
        console.log(error)
      }
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
      return (
        <WrappedComponent
          toggleItem={this.toggleItem}
          addItem={this.addItem}
          removeItem={this.removeItem}
          markAllAsUnpacked={this.markAllAsUnpacked}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

export default withItems
