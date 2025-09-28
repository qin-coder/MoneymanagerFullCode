import { useState, useRef, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, Sidebar, User, X } from 'lucide-react'
import { assets } from '../assets/assets.js'

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropDownRef = useRef(null)
  const { user, clearUser } = useContext(AppContext)
  const navigate = useNavigate()
  const leftBtnRef = useRef(null)

  useEffect(() => {
    if (leftBtnRef.current) {
      leftBtnRef.current.blur()
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    setShowDropdown(false)
    navigate('/login')
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <div className="flex gap-5 items-center justify-between bg-white px-4 py-4 border border-b border-gray-200/50 backdrop-blur-[2px] sm:px-7 stocky top-0 z-30">
      {/* left side menu button and title */}
      <div className="flex items-center gap-4">
        <button
          ref={leftBtnRef}
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 outline-none focus:outline-none focus-visible:outline-none"
        >
          {openSideMenu ? <X size={30} /> : <Menu size={30} />}
        </button>
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10" />
          <span className="text-xl font-medium text-gray-700 truncate">
            Money Manager
          </span>
        </div>
      </div>

      {/* right side - avatar photo */}
      <div className="relative" ref={dropDownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transation-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
        >
          <User size={30} />
        </button>
        {/* dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
            {/* user info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <User size={30} className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
            {/*drop options*/}
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              onClick={handleLogout}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* mobile side view */}
      {openSideMenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px] ">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Menubar
