const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Learn Redux Toolkit', completed: false, color: 'blue' },
]

const nextTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded':
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ]
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
