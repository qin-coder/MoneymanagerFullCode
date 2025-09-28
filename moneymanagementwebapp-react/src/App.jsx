import { BrowserRouter, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Filter from './pages/Filter'
import { Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
const Root = () => {
  const isAuthenticated = !!localStorage.getItem('user')
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App
