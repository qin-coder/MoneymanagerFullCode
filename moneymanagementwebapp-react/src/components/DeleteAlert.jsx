import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    setLoading(true)
    try {
      await onDelete()
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <p className="text-lg font-medium">{content}</p>
      <div className="mt-6 flex justify-end">
        <button
          className="add-btn add-btn-fill"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={20} className="animate-spin h-4 w-4" />
              Deleting...
            </>
          ) : (
            <>Delete</>
          )}
        </button>
      </div>
    </div>
  )
}
export default DeleteAlert
