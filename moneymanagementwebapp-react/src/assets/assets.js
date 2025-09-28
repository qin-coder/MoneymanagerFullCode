import logo from './logo.png'
import login_bg from './login_bg.jpg'
import register_bg from './1.jpg'
import { LayoutDashboard, List, Wallet, Coins, FunnelPlus } from 'lucide-react'
export const assets = {
  logo,
  login_bg,
  register_bg,
}
export const SIDE_BAR_DATA = [
  {
    id: '01',
    lable: 'Dashboard',
    icon: LayoutDashboard,
    link: '/',
  },
  { id: '02', lable: 'Categories', icon: List, link: '/category' },
  {
    id: '03',
    lable: 'Income',
    icon: Wallet,
    link: '/income',
  },
  {
    id: '04',
    lable: 'Expense',
    icon: Coins,
    link: '/expense',
  },
  {
    id: '05',
    lable: 'Filters',
    icon: FunnelPlus,
    link: '/filter',
  },
]
