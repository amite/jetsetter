import React, { Component } from 'react'
import { func, array, bool } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CountDown from './CountDown'
import NewItem from './NewItem'
import Items from './Items'

import * as ItemActions from '../actions'

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

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(ItemActions, dispatch)
)(JetSetter)
