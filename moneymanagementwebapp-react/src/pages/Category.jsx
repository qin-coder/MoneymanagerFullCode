import Dashboard from '../components/dashboard'
import useUser from '../hooks/useUser'
import { Plus } from 'lucide-react'
import CategoryList from '../components/CategoryList'
import { useState, useEffect } from 'react'
import axiosConfig from '../util/axiosConfig'
import { API_ENDPOINTS } from '../util/ApiEndpoints'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import AddCategoryForm from '../components/AddCategoryForm'

const Category = () => {
  useUser()
  const [loading, setLoading] = useState(false)
  const [categoryData, setcategoryData] = useState([])
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false)
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const fetchCategoryDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES)
      if (response.status === 200) {
        setcategoryData(response.data)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryDetails()
  }, [])
  const handleAddCategory = async (category) => {
    const { name, type, icon } = category
    if (!name.trim()) {
      toast.error('Please fill all name')
      return
    }
    //check if the category name already exists
    const categoryExists = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase()
    })
    if (categoryExists) {
      toast.error('Category name already exists')
      return
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGOTY, {
        name,
        type,
        icon,
      })

      if (response.status === 201) {
        toast.success('Category added successfully')
        setOpenAddCategoryModal(false)
        fetchCategoryDetails()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setOpenEditCategoryModal(true)
  }
  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory
    if (!name.trim()) {
      toast.error('Please fill all name')
      return
    }
    if (!id) {
      toast.error('Invalid category id')
      return
    }
    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      })
      setOpenAddCategoryModal(false)
      setSelectedCategory(null)

      toast.success('Category updated successfully')
      setOpenEditCategoryModal(false)
      fetchCategoryDetails()
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 text-green-800 font-bold rounded-md hover:bg-green-300 transition-colors"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/*category list*/}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/*adding category modal*/}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="AdD Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/*updating category modal*/}
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false)
            setSelectedCategory(null)
          }}
          title="Edit Category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            isEditing={true}
            onAddCategory={handleUpdateCategory}
          />
        </Modal>
      </div>
    </Dashboard>
  )
}

export default Category
