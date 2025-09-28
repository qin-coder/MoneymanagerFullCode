import Dashboard from '../components/dashboard'
import useUser from '../hooks/useUser'
const Filter = () => {
  useUser()
  return <Dashboard activeMenu="Filter">This is filter</Dashboard>
}

export default Filter
