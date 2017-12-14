import React, { Component } from 'react'
import CountDown from './CountDown'
import NewItem from './NewItem'
import ItemsContainer from './ItemsContainer'
import withItems from '../hocs/withItems'

import './Application.css'

class Application extends Component {
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
        <ItemsContainer
          title="Unpacked Items"
          onToggle={toggleItem}
          onRemove={removeItem}
          items={unpackedItems}
        />
        <ItemsContainer
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

export default withItems(Application)
