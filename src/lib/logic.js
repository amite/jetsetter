const markAllItemsAsUnpacked = () => ({ items }) => {
  return {
    items: items.map(item => {
      return { ...item, packed: false }
    })
  }
}

const addItem = newItem => ({ items }) => {
  return {
    items: [newItem, ...items]
  }
}

const removeItem = itemToRemove => ({ items }) => {
  return {
    items: items.filter(item => {
      return item.id !== itemToRemove.id
    })
  }
}

const toggleItem = itemToToggle => ({ items }) => {
  return {
    items: items.map(item => {
      if (item.id !== itemToToggle.id) return item
      return { ...itemToToggle, packed: !itemToToggle.packed }
    })
  }
}

export { markAllItemsAsUnpacked, addItem, removeItem, toggleItem }
