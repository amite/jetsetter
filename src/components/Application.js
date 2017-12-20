import React, { Component } from 'react'
import { func, array, bool } from 'prop-types'
import { connect } from 'react-redux'

import CountDown from './CountDown'
import NewItem from './NewItem'
import Items from './Items'

import {
  fetchItems,
  toggleItemAsync,
  addItemAsync,
  removeItemAsync,
  markAllAsUnpackedAsync
} from '../actions'

import './Application.css'

class JetSetter extends Component {
  static propTypes = {
    items: array.isRequired,
    loading: bool,
    fetchItems: func.isRequired,
    removeItemAsync: func.isRequired,
    addItemAsync: func.isRequired,
    toggleItemAsync: func.isRequired,
    markAllAsUnpackedAsync: func.isRequired
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    const {
      items,
      loading,
      toggleItemAsync,
      removeItemAsync,
      addItemAsync,
      markAllAsUnpackedAsync
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
          onToggle={toggleItemAsync}
          onRemove={removeItemAsync}
          items={unpackedItems}
        />
        <Items
          title="Packed Items"
          onToggle={toggleItemAsync}
          onRemove={removeItemAsync}
          items={packedItems}
        />
        <button className="button full-width" onClick={markAllAsUnpackedAsync}>
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
    toggleItemAsync(item) {
      dispatch(toggleItemAsync(item))
    },
    markAllAsUnpackedAsync() {
      dispatch(markAllAsUnpackedAsync())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JetSetter)
