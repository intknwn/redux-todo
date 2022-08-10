import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StatusFilter from '../filters/StatusFilters'
import ColorFilters from '../filters/ColorFilters'
import { colors } from '../filters/colors'
import { selectFilterStatus } from '../filters/filtersSlice'
import { selectRemainingTodos } from '../todos/todosSlice'

const Footer = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectFilterStatus)
  const remainingTodos = useSelector(selectRemainingTodos)

  const onColorChange = (color, changeType) =>
    console.log('Color change: ', { color, changeType })

  const handleAllCompleted = () => {
    dispatch({ type: 'todos/allCompleted' })
  }

  const handleClearCompleted = () => {
    dispatch({ type: 'todos/completedCleared' })
  }

  const onStatusChange = (status) => {
    dispatch({ type: 'filters/statusFilterChanged', payload: status })
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
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
