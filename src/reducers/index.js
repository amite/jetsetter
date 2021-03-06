import { combineReducers } from 'redux'
import {
  LOAD_ITEMS,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  ADD_ITEM,
  MARK_ALL_AS_UNPACKED,
  LOADING,
  LOADING_SUCCESS,
  LOADING_FAILED
} from '../actions/constants'

const loadingReducer = (loading = false, action) => {
  switch (action.type) {
    case LOADING:
      return true
    case LOADING_SUCCESS:
    case LOADING_FAILED:
      return false
    default:
      return loading
  }
}

const itemsReducer = (items = [], action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      return [...action.items, ...items]

    case ADD_ITEM:
      return [action.item, ...items]

    case REMOVE_ITEM:
      return items.filter(item => item.id !== action.item.id)

    case TOGGLE_ITEM:
      return items.map(item => {
        if (item.id !== action.item.id) return item
        return { ...action.item, packed: !action.item.packed }
      })

    case MARK_ALL_AS_UNPACKED:
      return items.map(item => ({ ...item, packed: false }))

    default:
      return items
  }
}

export default combineReducers({
  items: itemsReducer,
  loading: loadingReducer
})
