import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem.jsx'
import { selectFilteredTodoIds } from './todosSlice.js'

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)

  return (
    <ul className="todo-list">
      {todoIds.map((todoId) => (
        <TodoListItem key={todoId} id={todoId} />
      ))}
    </ul>
  )
}

export default TodoList
