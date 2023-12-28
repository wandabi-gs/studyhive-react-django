import React, { useEffect, Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { is_authenticated } from './backend'
import useAuthStore  from './store/auth'
import useThemeStore from './store/theme'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Base from './components/Base'
import Logout from './components/auth/Logout'
import Settings from './components/Settings'
import Category from './components/interest/Category'
import Categories from './components/interest/Categories'
import GroupChats from './components/chat/GroupChats'

function App() {

  const is_authenticated = useAuthStore((state) => state.isAuthenticated)
  const check_auth = useAuthStore((state) => state.checkAuth)
  const verifyDarkMode = useThemeStore((state) => state.verifyDarkMode)


  useEffect(() => {
    verifyDarkMode()
    if(!is_authenticated){
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
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:pk/:name' element={<Category />} />
        <Route path='/group-chat' element={<GroupChats />} />
      </Routes>
    </Base>
    </Suspense>
  )
}

export default App