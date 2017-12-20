import localforage from 'localforage'
import uniqueId from 'lodash/uniqueId'

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'Packer',
  version: 1.0
})

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true }
]

const getAll = async () => {
  const items =
    (await localforage.getItem('items')) ||
    (await localforage.setItem('items', defaultState))
  return items || []
}

export default {
  async add(item) {
    const items = await getAll()
    const newItem = { ...item, id: uniqueId() }
    localforage.setItem('items', [newItem, ...items])
    return newItem
  },

  async getAll() {
    return await getAll()
  },

  async delete({ id }) {
    const items = await getAll()
    localforage.setItem('items', items.filter(item => item.id !== id))
  },

  async update(itemToUpdate) {
    const toggledItem = { ...itemToUpdate, packed: !itemToUpdate.packed }
    const items = await getAll()
    localforage.setItem(
      'items',

      items.map(item => {
        if (item.id === toggledItem.id) return { ...item, ...toggledItem }
        return item
      })
    )
    return toggledItem
  },

  async markAllAsUnpacked() {
    const items = await getAll()
    localforage.setItem(
      'items',
      items.map(item => ({ ...item, packed: false }))
    )
  },

  async deleteUnpackedItems() {
    const items = await getAll()
    localforage.setItem('items', items.filter(({ packed }) => packed))
  }
}
