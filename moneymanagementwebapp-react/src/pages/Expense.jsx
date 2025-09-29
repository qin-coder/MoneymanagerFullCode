import Dashboard from '../components/dashboard'
import useUser from '../hooks/useUser'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { API_ENDPOINTS } from '../util/ApiEndpoints'
import axiosConfig from '../util/axiosConfig'
import ExpenseList from '../components/ExpenseList'
import Modal from '../components/Modal'
import AddExpenseForm from '../components/AddExpenseForm'
import DeleteAlert from '../components/DeleteAlert'
import ExpenseOverview from '../components/ExpenseOverview'

const Expense = () => {
  useUser()
  const [expenseData, setExpenseData] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  // fetch categories for expense
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE('expense')
      )
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      console.log('Error while fetching expense categories', error)
      toast.error(error.message)
    }
  }

  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES)
      if (response.status === 200) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log('Error while fetching expense details', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // save expense
  const handleAddExpense = async (expenseData) => {
    const { name, amount, date, icon, categoryId } = expenseData
    if (!name.trim()) {
      toast.error('Please fill name')
      return
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error('Please fill amount')
      return
    }
    if (!date) {
      toast.error('Please fill date')
      return
    }
    const today = new Date().toISOString().split('T')[0]
    if (date > today) {
      toast.error('Date cannot be in the future')
      return
    }
    if (!categoryId) {
      toast.error('Please choose category')
      return
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSES, {
        name,
        amount,
        date,
        icon,
        categoryId,
      })
      if (response.status === 201) {
        setOpenAddExpenseModal(false)
        toast.success('Expense added successfully')
        fetchExpenseCategories()
        fetchExpenseDetails()
      }
    } catch (error) {
      console.log('Error while adding expense', error)
      toast.error(error.message)
    }
  }

  // delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Expense deleted successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.log('Error while deleting expense', error)
      toast.error(error.message)
    }
  }

  //download execl
  const handleDownloadExpensesDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: 'blob' }
      )
      let filename = 'Expense.xlsx'
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log('Error while downloading expense details', error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    fetchExpenseCategories()
  }, [])

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpensesDetails}
          />
          {/* add expense modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Modal>
          {/* delete expense modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense
