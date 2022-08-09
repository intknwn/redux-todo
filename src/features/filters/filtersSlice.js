const initialState = {
  status: 'All',
  colors: [],
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged':
      return {
        ...state,
        status: action.payload,
      }
    case 'filters/colorFilterChanged': {
      const { colors } = state
      const { color, changeType } = action.payload

      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) {
            return state
          }

          return {
            ...state,
            colors: [...colors, color],
          }
        }
        case 'removed': {
          return {
            ...state,
            colors: colors.filter((stateColor) => stateColor !== color),
          }
        }
        default:
          return state
      }
    }

    default:
      return state
  }
}
