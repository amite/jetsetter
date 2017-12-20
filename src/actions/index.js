import {
  LOAD_ITEMS,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  ADD_ITEM,
  MARK_ALL_AS_UNPACKED
} from './constants'

import api from '../lib/api'

const loadItems = items => {
  return {
    type: LOAD_ITEMS,
    items
  }
}

const fetchItems = () => {
  return async dispatch => {
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
  return async dispatch => {
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
  return async dispatch => {
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

const markAllAsUnpacked = item => {
  return {
    type: MARK_ALL_AS_UNPACKED,
    item
  }
}

export {
  removeItemAsync,
  addItemAsync,
  toggleItem,
  markAllAsUnpacked,
  fetchItems
}
