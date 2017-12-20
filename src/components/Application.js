import React, { Component } from 'react'
import { func, array, bool } from 'prop-types'
import { connect } from 'react-redux'

import CountDown from './CountDown'
import NewItem from './NewItem'
import Items from './Items'

import {
  fetchItems,
  toggleItem,
  addItemAsync,
  removeItemAsync,
  markAllAsUnpacked
} from '../actions'

import './Application.css'

class JetSetter extends Component {
  static propTypes = {
    items: array.isRequired,
    loading: bool,
    fetchItems: func.isRequired,
    removeItemAsync: func.isRequired,
    addItemAsync: func.isRequired,
    toggleItem: func.isRequired,
    markAllAsUnpacked: func.isRequired
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    const {
      items,
      loading,
      toggleItem,
      removeItemAsync,
      addItemAsync,
      markAllAsUnpacked
    } = this.props

    const unpackedItems = items.filter(item => item.packed === false)
    const packedItems = items.filter(item => item.packed === true)

    return loading ? (
      <div>loading...</div>
    ) : (
      <div className="Application">
        <NewItem onSubmit={addItemAsync} />
        <CountDown />
        <Items
          title="Unpacked Items"
          onToggle={toggleItem}
          onRemove={removeItemAsync}
          items={unpackedItems}
        />
        <Items
          title="Packed Items"
          onToggle={toggleItem}
          onRemove={removeItemAsync}
          items={packedItems}
        />
        <button className="button full-width" onClick={markAllAsUnpacked}>
          Mark All As Unpacked
        </button>
      </div>
    )
  }
}

JetSetter.displayName = 'JetSetter'

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems() {
      dispatch(fetchItems())
    },
    addItemAsync(item) {
      dispatch(addItemAsync(item))
    },
    removeItemAsync(item) {
      dispatch(removeItemAsync(item))
    },
    markAllAsUnpacked() {
      dispatch(markAllAsUnpacked())
    },
    toggleItem(item) {
      dispatch(toggleItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JetSetter)
