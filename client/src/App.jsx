import { Navigate, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'
import useListenMessages from './hooks/useListenMessages.js'

function App() {

  const { authUser } = useAuthContext();
  useListenMessages();
  return (
    <>
      <div className=' p-4 h-screen flex justify-center items-center'>
        <Routes>
          <Route exact path='/' element={authUser ? <HomePage/> : <Navigate to="/login" /> } />
          <Route exact path='/login' element={authUser ? <Navigate to='/' /> : <Login/>} />
          <Route exact path='/signup' element={authUser ? <Navigate to='/' /> : <Signup/>} />
        </Routes>
        <Toaster></Toaster>
      </div>
    </>
  )
}

export default App
