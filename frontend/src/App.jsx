import { Routes, Route } from 'react-router-dom'
import { Login, Register, ProtectedRoute } from './features/auth'
import { BlogPage } from './features/blog/'
import { Layout, NotFound } from './features/shared'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<BlogPage />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
