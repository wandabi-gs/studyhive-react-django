import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Base from './components/Base'

function App() {

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }


  return (
    <Base>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Base>
  )
}

export default App