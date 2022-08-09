import React from 'react'
import TodoListItem from './TodoListItem.jsx'

const TodoList = () => {
  const todos = []

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
