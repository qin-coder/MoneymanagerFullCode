import { useState, useEffect } from 'react'
import Input from '../components/Input'
import EmojiPickerPopup from './EmojiPickerPopup'
import { LoaderCircle } from 'lucide-react'

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [categoryName, setCategoryName] = useState({
    name: '',
    type: 'income',
    icon: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategoryName(initialCategoryData)
    } else {
      setCategoryName({
        name: '',
        type: 'income',
        icon: '',
      })
    }
  }, [initialCategoryData, isEditing])

  const categoryTypeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ]
  const handleChange = (key, value) => {
    setCategoryName({ ...categoryName, [key]: value })
  }
  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onAddCategory(categoryName)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="p-4 ">
      <EmojiPickerPopup
        icon={categoryName.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={categoryName.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label="Category Name"
        placeholder="Enter category name"
        type="text"
      />
      <Input
        value={categoryName.type}
        onChange={({ target }) => handleChange('type', target.value)}
        label="Category Type"
        options={categoryTypeOptions}
        isSelect={true}
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin w-4 h-4" />
              {isEditing ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            <>{isEditing ? 'Update Category' : 'Add Category'}</>
          )}
        </button>
      </div>
    </div>
  )
}

export default AddCategoryForm
