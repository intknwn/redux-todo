import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StatusFilters } from './filtersSlice'
import { selectFilterStatus, statusFilterChanged } from './filtersSlice'

const StatusFilter = () => {
  const status = useSelector(selectFilterStatus)
  const dispatch = useDispatch()

  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleStatusChange = () => {
      dispatch(statusFilterChanged(value))
    }
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleStatusChange}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

export default StatusFilter
