import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const colors = ['#0088FE', '#00C49F', '#FF8042'] // Balance, Income, Expense

  const balanceData = [
    { name: 'Total Balance', value: totalBalance },
    { name: 'Total Income', value: totalIncome },
    { name: 'Total Expense', value: totalExpense },
  ]

  // 可选：格式化总余额为千分位字符串，比如 10000 → "10,000"
  const totalBalanceFormatted = totalBalance.toLocaleString()

  return (
    <div>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold">Finance Overview</h5>
        </div>

        <div className="h-[600px] w-full relative">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={balanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={180} 
                innerRadius={140} 
                fill="#8884d8"
                label={({ name, value }) =>
                  `${name}: $${value.toLocaleString()}`
                }
              >
                {balanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          {/* ✅ 在图表正中心显示：Total Balance: 10,000 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none', // 防止遮挡交互
            }}
          >
            <div className="text-lg font-semibold text-gray-800">
              Total Balance
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-2">
              ${totalBalanceFormatted}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceOverview
