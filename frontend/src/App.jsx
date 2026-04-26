import { Routes, Route } from 'react-router-dom'
import { Login, Register, ProtectedRoute } from './features/auth'
import { BlogPage } from './features/blog/'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<BlogPage />} />
      </Route>
    </Routes>
  )
}

export default App
