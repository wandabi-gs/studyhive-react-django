import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faHome, faDoorClosed, faDoorOpen, faUserPlus, faGear, faHamburger, faBars, faBook, faUserCircle, faLightbulb, faQuestionCircle, faPeopleGroup, faUserGroup } from '@fortawesome/free-solid-svg-icons'
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

  const getRoute = (cur_route) => (event) => {
    setRoute(cur_route);
  }


  const [sidebarActive, setSidebarActive] = useState(false)

  const ToggleSidebar = (event) => {
    event.preventDefault();
    document.getElementById('sidebar').classList.toggle('basis-72')

    setSidebarActive(!sidebarActive)
  }

  useEffect(() => {
    var cur_route = window.location.href.split("/")[3];
    if (cur_route == "") {
      cur_route = "home"
    }

    setRoute(cur_route);
  }, [])

  return (
    <div className="h-screen w-screen flex">
      <aside className='basis-16 min-w-fit shadow-xl flex flex-col p-3 bg-white dark:bg-slate-900 transition-all duration-500 ease-in-out' id='sidebar'>
        <SidebarLink display="all" sidebarActive={sidebarActive} currentRoute={route} name="Home" url="/" route="home" icon={faHome} getRoute={getRoute} />

        <SidebarLink display="auth" sidebarActive={sidebarActive} currentRoute={route} name="Recommendations" url="/recommendations" route="recommendations" icon={faLightbulb} getRoute={getRoute} />

        <SidebarLink display="all" sidebarActive={sidebarActive} currentRoute={route} name="Categories" url="/categories" route="categories" icon={faBook} getRoute={getRoute} />

        <SidebarLink display="auth" sidebarActive={sidebarActive} currentRoute={route} name="Account Settings" url="/settings" route="settings" icon={faGear} getRoute={getRoute} />

        <SidebarLink display="auth" sidebarActive={sidebarActive} currentRoute={route} name="For You" url="/for-you" route="for-you" icon={faUserCircle} getRoute={getRoute} />

        <SidebarLink display="auth" sidebarActive={sidebarActive} currentRoute={route} name="Group Chat" url="/group-chat" route="group-chat" icon={faUserGroup} getRoute={getRoute} />

        <SidebarLink display="all" sidebarActive={sidebarActive} currentRoute={route} name="Community Forum" url="/forum" route="forum-chat" icon={faPeopleGroup} getRoute={getRoute} />

        <SidebarLink display="not auth" sidebarActive={sidebarActive} currentRoute={route} name="Login" url="/login" route="login" icon={faDoorClosed} getRoute={getRoute} />

        <SidebarLink display="not auth" sidebarActive={sidebarActive} currentRoute={route} name="Create Account" url="/register" route="register" icon={faUserPlus} getRoute={getRoute} />

        <SidebarLink display="auth" sidebarActive={sidebarActive} currentRoute={route} name="Logout" url="/logout" route="logout" icon={faDoorOpen} getRoute={getRoute} />

        <SidebarLink display="all" sidebarActive={sidebarActive} currentRoute={route} name="Faqs" url="/faqs" route="faqs" icon={faQuestionCircle} getRoute={getRoute} />
      </aside>
      <main className='flex-grow max-h-full overflow-y-auto'>
        <nav className='sticky transition-all duration-500 ease-in-out bg-gray-200 dark:bg-slate-800 top-0 flex justify-between px-3 py-4 shadow-2xl h-16'>
          <div className='flex justify-start align-middle min-h-full'>
            <FontAwesomeIcon icon={faBars} className='mr-4 ml-2 mt-2' onClick={ToggleSidebar} /> <p className='text-2xl font-semibold'>StudyHive</p>
          </div>
          <div>
            {/* <Link onClick={getRoute("home")} to="/" className={`nav-link ${route == "home" && 'active'}`}>
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
            </Link>)} */}
          </div>
          <div className='flex justify-end'>
            <Link to="#" className='mx-4' onClick={ToggleDarkMode}>
              <FontAwesomeIcon className='text-xl' icon={darkModeEnabled ? faSun : faMoon} />
            </Link>
          </div>
        </nav>
        <div className='min-h-full p-3'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Base

export const SidebarLink = ({ display, name, route, url, icon, sidebarActive, currentRoute, getRoute }) => {

  const is_authenticated = useAuthStore((state) => state.isAuthenticated)

  var displayClass = ""

  if(is_authenticated){
    if(display == "not auth"){
      displayClass = "hidden"
    }
  }else{
    if(display == "auth"){
      displayClass = "hidden"
    }
  }

  const ToggleRouteIn = (rname) => (event) => {
    if(sidebarActive){
      return
    }
    document.getElementById(rname).classList.remove('hidden')
  }
  
  const ToggleRouteOut = (rname) => (event) => {
    if(sidebarActive){
      return
    }
    document.getElementById(rname).classList.add('hidden')
  }
  

  return (
    <Link onMouseOver={ToggleRouteIn(`h-${route}`)} onMouseLeave={ToggleRouteOut(`h-${route}`)} className={`sidebar-item relative ${sidebarActive ? "justify-start" : "justify-center"} ${displayClass} ${currentRoute == route && "active"}`} onClick={getRoute(route)} to={url}>
      <FontAwesomeIcon className='sidebar-icon' icon={icon} />
      <p className={`sidebar-route ${sidebarActive && "extended"}`} >{name}</p>
      <div id={`h-${route}`} className={`ml-2 top-0 hidden absolute left-full p-2 z-20 whitespace-nowrap min-w-fit rounded-xl bg-indigo-600`}>{name}</div>
    </Link>
  );
}