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

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const prepareIncomeLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return []

    const groupedByDate = {}

    transactions.forEach((t) => {
      const date = new Date(t.date).toISOString().split('T')[0] // YYYY-MM-DD
      groupedByDate[date] = (groupedByDate[date] || 0) + Number(t.amount)
    })

    return Object.entries(groupedByDate)
      .map(([date, total]) => ({
        date,
        income: total,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions)
    setChartData(result)
  }, [transactions])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' }) // Sep, Oct...

    // day 加上后缀
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
          <p>Detail: Income</p>
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
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-md text-gray-400 mt-0 5">
            Track your income sources and monitor your financial growth over
            time.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-200 text-green-800 font-bold rounded-md hover:bg-green-300 transition-colors" onClick={onAddIncome}>
          <Plus size={20} className="text-large" />
          Add Income
        </button>
      </div>
      <div
        className="mt-10 h-72"
        style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayedData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="90%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorIncome)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default IncomeOverview
