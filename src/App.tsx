// App.tsx
import { CssBaseline } from '@mui/material'
import Header from "./components/header/Header"
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard'
import AdminWrapper from './components/admin/AdminWrapper'
import AdminPanel from './components/header/AdminPanel'


function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={
          <AdminWrapper>
            <AdminPanel />
          </AdminWrapper>
        } />
      </Routes>
    </>
  )
}

export default App