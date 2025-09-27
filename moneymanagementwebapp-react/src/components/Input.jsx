import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
const Input = ({ label, value, onChange, placeholder, type }) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      <div className="relative">
        <input
          className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-2 outline-none pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
            {showPassword ? (
              <EyeIcon
                size={20}
                onClick={togglePassword}
                className="text-gray-500"
              />
            ) : (
              <EyeOffIcon
                size={20}
                onClick={togglePassword}
                className="text-slate-400"
              />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
