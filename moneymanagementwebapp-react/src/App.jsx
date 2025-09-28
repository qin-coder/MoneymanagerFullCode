import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { AppContext } from './context/AppContext.jsx'
// ... 其它 import 保持不变

const App = () => {
  // ✅ 从 Context 中获取 setUser 方法
  const { setUser } = useContext(AppContext)

  useEffect(() => {
    // 从 localStorage 读取保存的 user
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser) // ✅ 恢复用户状态，让整个 App 知道当前登录用户
      } catch (err) {
        console.error('Failed to parse user from localStorage', err)
        localStorage.removeItem('user') // 清理无效数据
      }
    }
  }, [setUser]) // 仅在组件挂载时执行一次

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
