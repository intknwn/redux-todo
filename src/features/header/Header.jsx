import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleTextChange = (e) => setText(e.target.value)

  const handleKeyDown = (e) => {
    const trimmedValue = e.target.value.trim()

    if (e.key === 'Enter' && trimmedValue) {
      dispatch({ type: 'todos/todoAdded', payload: trimmedValue })

      setText('')
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
