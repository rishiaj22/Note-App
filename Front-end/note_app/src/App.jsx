import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/note' element={<Notes/>}/>
      
    </Routes>
  )
}

export default App
