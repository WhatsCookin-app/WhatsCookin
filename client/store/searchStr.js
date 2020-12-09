import axios from 'axios'

// action type
const GET_SEARCH = 'GET_SEARCH'

// initial state
const defaultSearch = ''

export const getSearchStr = searchStr => ({
  type: GET_SEARCH,
  searchStr
})

// reducer
export default function(state = defaultSearch, action) {
  switch (action.type) {
    case GET_SEARCH:
      return action.searchStr
    default:
      return ''
  }
}
