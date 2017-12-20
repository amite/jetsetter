import React, { Component } from 'react'
import CountDown from './CountDown'
import NewItem from './NewItem'
import Items from './Items'
import withItems from '../hocs/withItems'
import { func, array, bool } from 'prop-types'

import './Application.css'

class JetSetter extends Component {
  static propTypes = {
    items: array.isRequired,
    loading: bool,
    removeItem: func.isRequired,
    addItem: func.isRequired,
    toggleItem: func.isRequired,
    markAllAsUnpacked: func.isRequired
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

export default withItems(JetSetter)
