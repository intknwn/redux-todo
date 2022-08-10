import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StatusFilter from '../filters/StatusFilters'
import ColorFilters from '../filters/ColorFilters'
import {
  selectRemainingTodos,
  allCompleted,
  completedCleared,
} from '../todos/todosSlice'

const Footer = () => {
  const dispatch = useDispatch()

  const remainingTodos = useSelector(selectRemainingTodos)

  const handleAllCompleted = () => {
    dispatch(allCompleted())
  }

  const handleClearCompleted = () => {
    dispatch(completedCleared())
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={handleAllCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>

      <div className="todo-count">
        <h5>Remaining Todos</h5>
        <strong>{remainingTodos.length}</strong> item
        {remainingTodos.length === 1 ? '' : 's'} left
      </div>
      <StatusFilter />
      <ColorFilters />
    </footer>
  )
}

export default Footer
