import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { colors, capitalize } from '../filters/colors'
import { selectTodoById, colorSelected, todoToggled } from './todosSlice'

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo
  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id))
  }

  const handleColorChanged = (e) => {
    dispatch(colorSelected(todo.id, e.target.value))
  }

  const handleDelete = () => {
    dispatch({ type: `todos/todoDeleted`, payload: todo.id })
  }

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {capitalize(color)}
              </option>
            ))}
          </select>
          <button className="destroy" onClick={handleDelete}>
            &#9587;
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
