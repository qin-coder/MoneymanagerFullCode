import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { User } from 'lucide-react'
import { SIDE_BAR_DATA } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className="max-[1080px]:hidden">
      {/* Sidebar  content*/}
      <div className="w-80 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ''}
              alt="profile image"
              className="w-20 h-20 rounded-full bg-slate-400"
            />
          ) : (
            <User size={20} className="text-xl" />
          )}
          <h5 className="text-gray-950 font-medium leading-6">
            {user.fullName || ''}
          </h5>
        </div>
        {/* menu items */}
        {SIDE_BAR_DATA.map((item, index) => (
          <button
            onClick={() => navigate(item.link)}
            key={`menu_${index}`}
            className={`cursor-pointer w-full flex items-center gap-4 text-[20px] py-3 px-6 rounded-lg mb-3 ${activeMenu === item.lable ? 'bg-purple-800 text-white' : ''}`}
          >
            <item.icon size={20} />
            {item.lable}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
