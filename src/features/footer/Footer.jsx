import React from 'react'
import StatusFilter from '../filters/StatusFilters'
import ColorFilters from '../filters/ColorFilters'
import { colors } from '../filters/colors'
import { StatusFilters } from '../filters/filtersSlice'

const Footer = () => {
  const todosRemaining = 1

  const onColorChange = (color, changeType) =>
    console.log('Color change: ', { color, changeType })
  const onStatusChange = (status) => console.log('Status change: ', status)

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <div className="todo-count">
        <h5>Remaining Todos</h5>
        <strong>{todosRemaining}</strong> item{todosRemaining === 1 ? '' : 's'}{' '}
        left
      </div>
      <StatusFilter value={StatusFilters.All} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
