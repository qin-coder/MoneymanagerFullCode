import Dashboard from '../components/dashboard'
import useUser from '../hooks/useUser'

const Home = () => {
  useUser()
  return (
    <div>
      <Dashboard activeMenu="Dashboard">This is homepage</Dashboard>
    </div>
  )
}

export default Home
