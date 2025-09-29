import { useEffect, useState } from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts'
import { Plus } from 'lucide-react'

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const prepareExpenseLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return []

    const groupedByDate = {}

    transactions.forEach((t) => {
      const date = new Date(t.date).toISOString().split('T')[0]
      groupedByDate[date] = (groupedByDate[date] || 0) + Number(t.amount)
    })

    return Object.entries(groupedByDate)
      .map(([date, total]) => ({
        date,
        expense: total,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions)
    setChartData(result)
  }, [transactions])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th'
    return `${day}${suffix} ${month}`
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border text-sm">
          <p className="font-semibold">{label}</p>
          <p>Total: ${payload[0].value}</p>
          <p>Detail: Expense</p>
        </div>
      )
    }
    return null
  }

  const displayedData = chartData.slice(-7)

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-md text-gray-400 mt-0 5">
            Track your expense patterns and monitor your financial outflow over
            time.
          </p>
        </div>
        <button className="add-btn" onClick={onAddExpense}>
          <Plus size={20} className="text-large" />
          Add Expense
        </button>
      </div>
      <div
        className="mt-10 h-72"
        style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayedData}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="90%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f43f5e"
              fillOpacity={1}
              fill="url(#colorExpense)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ExpenseOverview
