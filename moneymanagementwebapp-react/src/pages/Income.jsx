import Dashboard from '../components/dashboard'
import useUser from '../hooks/useUser'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { API_ENDPOINTS } from '../util/ApiEndpoints'
import axiosConfig from '../util/axiosConfig'
import IncomeList from '../components/IncomeList'
import Modal from '../components/Modal'

import AddIncomeForm from '../components/AddIncomeForm'
import DeleteAlert from '../components/DeleteAlert'
import IncomeOverview from '../components/IncomeOverview'

const Income = () => {
  useUser()
  const [incomeData, setIncomeData] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  //fetch categories for income
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE('income')
      )
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      console.log('Error while fetching income categories', error)
      toast.error(error.message)
    }
  }

  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES)
      if (response.status === 200) {
        console.log('income categoies', response.data)
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log('Error while fetching income details', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  //save the income details
  const handleAddIncome = async (incomeData) => {
    const { name, amount, date, icon, categoryId } = incomeData
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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOMES, {
        name,
        amount,
        date,
        icon,
        categoryId,
      })
      console.log(response.status)
      if (response.status === 201) {
        setOpenAddIncomeModal(false)
        toast.success('Income added successfully')
        fetchIncomeCategories()
        fetchIncomeDetails()
      }
    } catch (error) {
      console.log('Error while adding income', error)
      toast.error(error.message)
    }
  }
  //delete income
  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Income deleted successfully')
      fetchIncomeDetails()
    } catch (error) {
      console.log('Error while deleting income', error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
    fetchIncomeCategories()
  }, [])

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/*overview for income with line char */}

            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          />
          {/*add income modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Modal>
          {/*delete income modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Income
