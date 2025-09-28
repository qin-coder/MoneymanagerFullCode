import { useState } from 'react'
import { Image, X } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData?.imageUrl || '')
    setIsOpen(false)
  }
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-xl text-purple-500 bg-purple-50 rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <Image />
          )}
        </div>
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>
      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center text-gray-500 bg-white rounded-full border-gray-200 absolute -top-2 -right-2 z-10 cursor-pointer"
          >
            <X />
          </button>
          <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup
