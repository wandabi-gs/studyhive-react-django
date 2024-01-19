import React, { useEffect, Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { is_authenticated } from './backend'
import useAuthStore from './store/auth'
import useThemeStore from './store/theme'

function App() {

  const is_authenticated = useAuthStore((state) => state.isAuthenticated)
  const check_auth = useAuthStore((state) => state.checkAuth)
  const verifyDarkMode = useThemeStore((state) => state.verifyDarkMode)
  const verifyFont = useThemeStore((state) => state.verifyFont)

  const Home = React.lazy(() => import('./components/Home'));
  const Register = React.lazy(() => import('./components/auth/Register'));
  const Login = React.lazy(() => import('./components/auth/Login'));
  const Base = React.lazy(() => import('./components/Base'));
  const Logout = React.lazy(() => import('./components/auth/Logout'));
  const Settings = React.lazy(() => import('./components/Settings'));
  const Interests = React.lazy(() => import('./components/interest/Interests'));
  const GroupChats = React.lazy(() => import('./components/chat/GroupChats'));
  const Connection = React.lazy(() => import('./components/connection/Connection'));
  const Connections = React.lazy(() => import('./components/connection/Connections'));


  useEffect(() => {
    verifyDarkMode()
    verifyFont()
    if (!is_authenticated) {
      check_auth()
    }

  })

  return (
    <Suspense fallback="Loading ....." >
      <Base>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/interests' element={<Interests />} />
          <Route path='/group-chat' element={<GroupChats />} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/connection/:pk' element={<Connection />} />
        </Routes>
      </Base>
    </Suspense>
  )
}

export default App