import Dashboard from "../components/dashboard"
import useUser from "../hooks/useUser"
const Category = () => {
  useUser()
  return <Dashboard activeMenu="Category">This is Category</Dashboard>
}

export default Category
