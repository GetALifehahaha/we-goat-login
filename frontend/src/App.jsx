import { Routes, Route } from 'react-router-dom'
import { Login, Register } from './features/auth'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
    </Routes>
  )
}

export default App
