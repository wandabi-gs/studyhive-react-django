import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faHome, faDoorClosed, faDoorOpen, faUserPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import useAuthStore from "../store/auth";
import useThemeStore from '../store/theme'

function Base({ children }) {
  const is_authenticated = useAuthStore((state) => state.isAuthenticated)
  const darkModeEnabled = useThemeStore((state) => state.darkModeEnabled)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)

  const ToggleDarkMode = (event) => {
    toggleDarkMode()
  }

  const [route, setRoute] = useState("home")

  const getRoute =(cur_route) => (event) =>{
    setRoute(cur_route);
  }

  useEffect(() => {
    var cur_route = window.location.href.split("/")[3];
    if(cur_route == ""){
      cur_route = "home"
    }

    setRoute(cur_route);
  }, [])

  return (
    <React.Fragment>
      <nav className='sticky top-0 flex justify-between px-3 py-4 shadow-2xl'>
        <div>
          <p className='text-2xl font-semibold'>StudyHive</p>
        </div>
        <div>
          <Link onClick={getRoute("home")} to="/" className={`nav-link ${route == "home" && 'active'}`}>
            <FontAwesomeIcon className='nav-icon' icon={faHome} />Home
            </Link>
            
          <Link onClick={getRoute("settings")} to="/settings" className={`nav-link ${route == "settings" && 'active'}`}>
            <FontAwesomeIcon className='nav-icon' icon={faGear} />Settings
            </Link>

          {!is_authenticated && (<Link onClick={getRoute("login")} to="/login" className={`nav-link ${route == "login" && 'active'}`}>
            <FontAwesomeIcon className='nav-icon' icon={faDoorClosed} /> Login
          </Link>)}

          {!is_authenticated && (<Link onClick={getRoute('register')} to="/register" className={`nav-link ${route == "register" && 'active'}`}>
          <FontAwesomeIcon className='nav-icon' icon={faUserPlus} />Register
          </Link>)}

          {is_authenticated && (<Link onClick={getRoute('home')} to="/logout" className={`nav-link ${route == "logout" && 'active'}`}>
            <FontAwesomeIcon icon={faDoorOpen} className='nav-icon' />Logout
          </Link>)}
        </div>
        <div className='flex justify-end'>
          <Link to="#" className='mx-4' onClick={ToggleDarkMode}>
            <FontAwesomeIcon className='text-xl' icon={darkModeEnabled ? faSun : faMoon} />
          </Link>
        </div>
      </nav>
      {/* <hr className='bg-slate-950 border-0 border-b border-slate-950' /> */}
      <div className='p-3'>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Base