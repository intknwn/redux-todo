import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = []

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosLoaded(state, action) {
      return action.payload
    },
    todoAdded(state, action) {
      return [...state, action.payload]
    },
    todoToggled(state, action) {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    },
    colorSelected: {
      reducer(state, action) {
        const { id, color } = action.payload

        return state.map((todo) => {
          if (todo.id !== id) {
            return todo
          }

          return {
            ...todo,
            color,
          }
        })
      },
      prepare(id, color) {
        return {
          payload: { id, color },
        }
      },
    },
    todoDeleted(state, action) {
      return state.filter((todo) => todo.id !== action.payload)
    },
    allCompleted(state) {
      return state.map((todo) => ({ ...todo, completed: true }))
    },
    completedCleared(state) {
      return state.filter((todo) => !todo.completed)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        const todo = action.payload
        return [...state, todo]
      })
  },
})

export const {
  todosLoaded,
  todoAdded,
  todoToggled,
  colorSelected,
  todoDeleted,
  allCompleted,
  completedCleared,
} = todoSlice.actions

export const selectTodos = (state) => state.todos

export const selectTodoIds = createSelector(selectTodos, (todos) =>
  todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, { status, colors }) => {
    const isAllComplitions = status === StatusFilters.ALL
    if (isAllComplitions && colors.length === 0) {
      return todos
    }

    const isCompleted = status === StatusFilters.COMPLETED

    return todos.filter((todo) => {
      const statusMatches = isAllComplitions || todo.completed === isCompleted
      const colorMatches = colors.length === 0 || colors.includes(todo.color)

      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

export const selectTodoById = (state, todoId) =>
  state.todos.find((todo) => todo.id === todoId)

export const selectRemainingTodos = (state) =>
  state.todos.filter((todo) => !todo.completed)

export const fetchTodos = createAsyncThunk('todos/todosLoaded', async () => {
  const res = await client.get('/fakeApi/todos')
  return res.todos
})

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const todo = { text }
    const res = await client.post('/fakeApi/todos', { todo })
    return res.todo
  }
)

export default todoSlice.reducer
