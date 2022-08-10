import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { colors, capitalize } from './colors'
import { selectColors } from './filtersSlice'

const ColorFilters = () => {
  const dispatch = useDispatch()
  const stateColors = useSelector(selectColors)
  const renderedColors = colors.map((color) => {
    const checked = stateColors.includes(color)
    const handleColorChange = () => {
      const changeType = checked ? 'removed' : 'added'
      dispatch({
        type: 'filters/colorFilterChanged',
        payload: { color, changeType },
      })
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleColorChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

export default ColorFilters
