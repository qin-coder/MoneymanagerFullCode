import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import Input from '../components/input.jsx'
import axiosConfig from '../util/axiosConfig.jsx'
import { API_ENDPOINTS } from '../util/ApiEndpoints.js'
import { validateEmail } from '../util/validation.js'
import { LoaderCircle } from 'lucide-react'
const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    if (!password.trim()) {
      setError('Please input your password')
      setIsLoading(false)
      return
    }
    setError('')

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      })
      if (response.status === 200) {
        const { token, user } = response.data
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        console.log('Logged in user:', user, response.data.password)
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Sign in to manage your expenses
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="col-span-2 ">
              <Input
                label="Email Address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />

              <div className="col-span-2">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`rounded-lg bg-purple-500 text-white w-full text-lg font-medium py-3 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Loging in...
                </>
              ) : (
                'Login in'
              )}
            </button>
            <p className="text-sm text-center text-slate-800">
              Don’t have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
