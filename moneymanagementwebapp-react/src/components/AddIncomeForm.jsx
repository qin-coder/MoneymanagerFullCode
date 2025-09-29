import { useEffect, useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup'
import Input from '../components/Input'
import { LoaderCircle } from 'lucide-react'
const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [incomeData, setIncomeData] = useState({
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
    setIncomeData({ ...incomeData, [key]: value })
  }

  const handleAddIncome = async () => {
    setLoading(true)
    try {
      await onAddIncome(incomeData)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (categories.length > 0 && !incomeData.categoryId) {
      setIncomeData((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }))
    }
  }, [categories, incomeData.categoryId])

  return (
    <div>
      <EmojiPickerPopup
        icon={incomeData.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={incomeData.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label="Income Source"
        placeholder="Enter Source"
        type="text"
      />

      <Input
        value={incomeData.categoryId}
        onChange={({ target }) => handleChange('categoryId', target.value)}
        label="category"
        isSelect={true}
        options={categoryoptions}
      />
      <Input
        value={incomeData.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="amount"
        placeholder="Enter amount"
        type="number"
      />
      <Input
        value={incomeData.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="date"
        placeholder="Enter date"
        type="date"
      />
      <div className="flex justify-end md-6">
        <button
          onClick={handleAddIncome}
          className="add-btn add-btn-fill"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" /> Adding
            </>
          ) : (
            <>Add Income</>
          )}
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
