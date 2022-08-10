import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

const initialState = {
  status: StatusFilters.ALL,
  colors: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      return { ...state, status: action.payload }
    },
    colorFilterChanged: {
      reducer(state, action) {
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
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        }
      },
    },
  },
})

export const selectFilterStatus = (state) => state.filters.status

export const selectColors = (state) => state.filters.colors

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions

export default filtersSlice.reducer
