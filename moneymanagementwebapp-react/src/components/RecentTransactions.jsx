import { ArrowRight } from 'lucide-react'
import TransationInfoCard from './TransationInfoCard'
import moment from 'moment'

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button className="card-btn" onClick={onMore}>
          More <ArrowRight className="text-base" size={20} />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => {
          console.log('🔍 交易 item:', item) // 打印整个 item
          console.log('🔍 交易 type:', item.type) // 打印 type 的值
          return (
            <TransationInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format('Do MMM, YYYY')}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          )
        })}
      </div>
    </div>
  )
}

export default RecentTransactions
