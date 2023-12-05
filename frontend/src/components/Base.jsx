import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

function Base({ children }) {

  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const VerifyDarkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkModeEnabled(true)
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const ToggleDarkMode = (event) => {
    document.documentElement.classList.toggle('dark')
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    setDarkModeEnabled(!darkModeEnabled)
  }

  useEffect(() => {
    VerifyDarkMode();
  }, [])

  return (
    <React.Fragment>
      <nav className='p-3 sticky top-0 flex justify-center h-12'>
        <Link to="/" className='nav-link active'>Home</Link>
        <Link to="/login" className='nav-link'>Login</Link>
        <Link to="/register" className='nav-link'>Register</Link>
        <Link to="#" className='mx-4' onClick={ToggleDarkMode}>
          <FontAwesomeIcon icon={darkModeEnabled ? faSun : faMoon} />
        </Link>
      </nav>
      <hr className='bg-slate-950 border-0 border-b border-slate-950' />
      <div className='p-3'>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Base