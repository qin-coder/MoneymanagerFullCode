import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import TransationInfoCard from './TransationInfoCard'
const Transactions = ({ transactions, onMore, title }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">{title}</h5>
        <button className="card-btn" onClick={onMore}>
          More <ArrowRight className="text-base" size={20} />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransationInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format('Do MMM, YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default Transactions
