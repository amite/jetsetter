import { combineReducers } from 'redux'
import {
  TOGGLE_ITEM,
  REMOVE_ITEM,
  ADD_ITEM,
  MARK_ALL_AS_UNPACKED
} from '../actions/constants'


const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [action.item, ...state]

    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.item.id)

    case TOGGLE_ITEM:
      return state.map(item => {
        if (item.id !== action.item.id) return item
        return { ...action.item, packed: !action.item.packed }
      })

    case MARK_ALL_AS_UNPACKED:
      return state.map(item => ({ ...item, packed: false }))

    default:
      return state
  }
}

export default combineReducers({
  items: itemsReducer
})
