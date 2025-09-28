import Dashboard from "../components/dashboard"
import useUser from "../hooks/useUser"
const Income = () => {
  useUser()
  return <Dashboard activeMenu="Income">This is income</Dashboard>
}

export default Income
