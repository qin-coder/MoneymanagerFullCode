import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import Input from '../components/input.jsx'
import { validateEmail } from '../util/validation.js'
import axiosConfig from '../util/axiosConfig.jsx'
import { API_ENDPOINTS } from '../util/ApiEndpoints.js'
import { toast } from 'react-hot-toast'
import { LoaderCircle } from 'lucide-react'

const SignUp = () => {
  const [fullName, setfullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!fullName.trim()) {
      setError('Please input your full name')
      setIsLoading(false)
      return
    }

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
    //sign up api call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
      })
      if (response.status === 201) {
        toast.success('Registration successful! Please log in.')
        navigate('/login')
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
            Create an Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your expenses today!
          </p>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="flex justify-center mb-6">{/*img here*/}</div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                placeholder="John Doe"
              />

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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className={`rounded-lg bg-purple-500 text-white w-full text-lg font-medium py-3 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            <p className="text-sm text-center text-slate-800">
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/login')}
              >
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
