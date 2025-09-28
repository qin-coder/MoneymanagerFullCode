import { Trash, Upload, User } from 'lucide-react'
import { useRef, useState } from 'react'

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = (e) => {
    e.preventDefault()
    setImage(null)
    setPreviewUrl(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
  }

  const onChooseFile = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  return (
    <div className="flex flex-col items-center mb-6">
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <User className="text-purple-500 w-8 h-8" />
          <button
            onClick={onChooseFile}
            className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
          >
            <Upload size={14} className="text-purple-500" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
          >
            <Trash size={15} />
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  )
}

export default ProfilePhotoSelector
