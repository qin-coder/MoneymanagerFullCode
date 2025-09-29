import React from 'react'
import { Download, Mail } from 'lucide-react'
import TransationInfoCard from './TransationInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Incomes Sources</h4>
        <div className="flex items-center justify-end gap-2">
          <button className="card-btn">
            <Mail size={20} className="text-base" />
            Email
          </button>
          <button className="card-btn">
            <Download size={20} className="text-base" />
            Download
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/*display income list */}
        {transactions?.map((income) => (
          <TransationInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format('Do MMM, YYYY')}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
      
    </div>
  )
}

export default IncomeList
