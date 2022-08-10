import { createSelector } from 'reselect'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Learn Redux Toolkit', completed: false, color: 'blue' },
]

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

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todosLoaded':
      return action.payload
    case 'todos/todoAdded':
      return [...state, action.payload]
    case 'todos/todoToggled':
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    case 'todos/colorSelected': {
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
    }
    case 'todos/todoDeleted':
      return state.filter((todo) => todo.id !== action.payload)
    case 'todos/allCompleted':
      return state.map((todo) => ({ ...todo, completed: true }))
    case 'todos/completedCleared':
      return state.filter((todo) => !todo.completed)
    default:
      return state
  }
}

export const fetchTodos = async (dispatch) => {
  const res = await client.get('/fakeApi/todos')
  dispatch({ type: 'todos/todosLoaded', payload: res.todos })
}

export const saveNewTodo = (text) => async (dispatch) => {
  const todo = { text }
  const res = await client.post('/fakeApi/todos', { todo })
  dispatch({ type: 'todos/todoAdded', payload: res.todo })
}
