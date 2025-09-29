import { WalletCards, Wallet, Coins } from 'lucide-react'
import Dashboard from '../components/dashboard'
import InfoCard from '../components/InfoCard'
import useUser from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosConfig from '../util/axiosConfig'
import { API_ENDPOINTS } from '../util/ApiEndpoints'
import toast from 'react-hot-toast'
import RecentTransactions from '../components/RecentTransactions'
import FinanceOverview from '../components/FinanceOverview'
import Transactions from '../components/Transactions'

const Home = () => {
  useUser()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({})
  const [loading, setLoading] = useState(false)
  const fetchDashboardData = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA)
      if (response.status === 200 || response.status === 201) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    return () => {}
  }, [])
  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={dashboardData?.totalBalance || 0}
              color="bg-purple-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={dashboardData?.totalIncome || 0}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={dashboardData?.totalExpense || 0}
              color="bg-red-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onMore={() => navigate('/expense')}
            />
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
            <Transactions
              transactions={dashboardData?.latest5Expenses || []}
              onMore={() => navigate('/expense')}
              type="expense"
              title="Latest Expenses"
            />

            <Transactions
              transactions={dashboardData?.latest5Incomes || []}
              onMore={() => navigate('/income')}
              type="expense"
              title="Latest Incomes"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home
