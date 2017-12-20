import {
  TOGGLE_ITEM,
  REMOVE_ITEM,
  ADD_ITEM,
  MARK_ALL_AS_UNPACKED
} from './constants'

const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

const removeItem = item => {
  return {
    type: REMOVE_ITEM,
    item
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

export { addItem, removeItem, toggleItem, markAllAsUnpacked }
