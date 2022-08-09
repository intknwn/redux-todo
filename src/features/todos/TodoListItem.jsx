import React from 'react'
import { colors, capitalize } from '../filters/colors'

const TodoListItem = ({
  todo: { text, completed, color },
  onColorChange,
  onCompletedChange,
  onDelete,
}) => {
  const handleCompletedChanged = (e) => {
    onCompletedChange(e.target.checked)
  }

  const handleColorChanged = (e) => {
    onColorChange(e.target.value)
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
          <button className="destroy" onClick={onDelete}>
            &#9587;
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
