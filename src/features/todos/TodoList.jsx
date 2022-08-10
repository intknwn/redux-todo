import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem.jsx'
import { selectTodoIds } from './todosSlice.js'

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  return (
    <ul className="todo-list">
      {todoIds.map((todoId) => (
        <TodoListItem key={todoId} id={todoId} />
      ))}
    </ul>
  )
}

export default TodoList
