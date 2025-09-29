import { useEffect, useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup'
import Input from '../components/Input'
import { LoaderCircle } from 'lucide-react'

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: '',
  })
  const [loading, setLoading] = useState(false)

  const categoryoptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const handleChange = (key, value) => {
    setExpenseData({ ...expenseData, [key]: value })
  }

  const handleAddExpense = async () => {
    setLoading(true)
    try {
      await onAddExpense(expenseData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (categories.length > 0 && !expenseData.categoryId) {
      setExpenseData((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }))
    }
  }, [categories, expenseData.categoryId])

  return (
    <div>
      <EmojiPickerPopup
        icon={expenseData.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={expenseData.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label="Expense Item"
        placeholder="Enter expense item"
        type="text"
      />

      <Input
        value={expenseData.categoryId}
        onChange={({ target }) => handleChange('categoryId', target.value)}
        label="Category"
        isSelect={true}
        options={categoryoptions}
      />

      <Input
        value={expenseData.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={expenseData.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder="Enter date"
        type="date"
      />

      <div className="flex justify-end md-6">
        <button
          onClick={handleAddExpense}
          className="add-btn add-btn-fill"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" /> Adding
            </>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm
