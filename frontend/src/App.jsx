import React, { useEffect, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import useAuthStore from './store/auth'
import useThemeStore from './store/theme'
import Loader from './components/Loader'
import Chat from './components/chat/Chat'

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
  const CreateGroup = React.lazy(() => import('./components/chat/CreateGroup'));
  const Groups = React.lazy(() => import('./components/chat/Groups'));
  const Group = React.lazy(() => import('./components/chat/Group'));
  const Connection = React.lazy(() => import('./components/connection/Connection'));
  const Connections = React.lazy(() => import('./components/connection/Connections'));
  const Recommendations = React.lazy(() => import('./components/interest/Recommendations'));
  const Recommendation = React.lazy(() => import('./components/interest/Recommendation'));
  const Interest = React.lazy(() => import('./components/interest/Interest'));
  const AddContent = React.lazy(() => import('./components/content/AddContent'));
  const ListContent = React.lazy(() => import('./components/content/ListContent'));
  const ViewContent = React.lazy(() => import('./components/content/ViewContent'));
  const ManageContent = React.lazy(() => import('./components/content/ManageContent'));
  const User = React.lazy(() => import('./components/user/User'));


  useEffect(() => {
    verifyDarkMode()
    verifyFont()
    if (!is_authenticated) {
      check_auth()
    }

  })

  return (
    <Suspense fallback={<Loader />} >
      <Base>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/interests' element={<Interests />} />
          <Route path='/interest/:pk' element={<Interest />} />
          <Route path='/recommendations' element={<Recommendations/>} />
          <Route path='/recommendation/:pk/:source' element={<Recommendation/>} />
          <Route path='/user/:pk' element={<User />} />
          <Route path='/group-chat' element={<Groups />} />
          <Route path='/group-chat/:pk' element={<Group />} />
          <Route path='/create-group' element={<CreateGroup />} />
          <Route path='/user-content/add' element={<AddContent />} />
          <Route path='/user-content' element={<ListContent />} />
          <Route path='/user-content/:pk/view' element={<ViewContent />} />
          <Route path='/user-content/manage' element={<ManageContent />} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/connection/:pk' element={<Connection />} />
        </Routes>
      </Base>
    </Suspense>
  )
}

export default App