import Dashboard from "../components/dashboard"
import useUser from "../hooks/useUser"
const Expense = () => {
  useUser()
  return <Dashboard activeMenu="Expense">This is expense</Dashboard>
}

export default Expense
