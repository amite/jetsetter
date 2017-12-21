import {
  LOAD_ITEMS,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  ADD_ITEM,
  MARK_ALL_AS_UNPACKED
} from './constants'

const loadItems = items => {
  return {
    type: LOAD_ITEMS,
    items
  }
}

const fetchItems = () => {
  return async (dispatch, getState, api) => {
    let items = await api.getAll()
    dispatch(loadItems(items))
  }
}

const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

const addItemAsync = item => {
  return async (dispatch, getState, api) => {
    let newItem = await api.add(item)
    dispatch(addItem(newItem))
  }
}

const removeItem = item => {
  return {
    type: REMOVE_ITEM,
    item
  }
}

const removeItemAsync = item => {
  return async (dispatch, getState, api) => {
    await api.delete(item)
    dispatch(removeItem(item))
  }
}

const toggleItem = item => {
  return {
    type: TOGGLE_ITEM,
    item
  }
}

const toggleItemAsync = itemToToggle => {
  return async (dispatch, getState, api) => {
    await api.update(itemToToggle)
    dispatch(toggleItem(itemToToggle))
  }
}

const markAllAsUnpacked = () => {
  return {
    type: MARK_ALL_AS_UNPACKED
  }
}

const markAllAsUnpackedAsync = () => {
  return async (dispatch, getState, api) => {
    await api.markAllAsUnpacked()
    dispatch(markAllAsUnpacked())
  }
}

export {
  removeItemAsync,
  addItemAsync,
  toggleItemAsync,
  markAllAsUnpackedAsync,
  fetchItems
}
