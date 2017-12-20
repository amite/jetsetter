import React, { Component } from 'react'
import { func, array, bool } from 'prop-types'
import { connect } from 'react-redux'

import CountDown from './CountDown'
import NewItem from './NewItem'
import Items from './Items'

import {
  fetchItems,
  toggleItem,
  addItem,
  removeItem,
  markAllAsUnpacked
} from '../actions'

import './Application.css'

class JetSetter extends Component {
  static propTypes = {
    items: array.isRequired,
    loading: bool,
    fetchItems: func.isRequired,
    removeItem: func.isRequired,
    addItem: func.isRequired,
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
      removeItem,
      addItem,
      markAllAsUnpacked
    } = this.props

    const unpackedItems = items.filter(item => item.packed === false)
    const packedItems = items.filter(item => item.packed === true)

    return loading ? (
      <div>loading...</div>
    ) : (
      <div className="Application">
        <NewItem onSubmit={addItem} />
        <CountDown />
        <Items
          title="Unpacked Items"
          onToggle={toggleItem}
          onRemove={removeItem}
          items={unpackedItems}
        />
        <Items
          title="Packed Items"
          onToggle={toggleItem}
          onRemove={removeItem}
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
    addItem(item) {
      dispatch(addItem(item))
    },
    removeItem(item) {
      dispatch(removeItem(item))
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
