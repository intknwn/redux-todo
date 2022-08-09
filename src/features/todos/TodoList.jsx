import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem.jsx'
import { selectTodos } from './todosSlice.js'

const TodoList = () => {
  const todos = useSelector(selectTodos)

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
