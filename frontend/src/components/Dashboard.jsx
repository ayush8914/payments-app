import React from 'react'
import AppBar from './AppBar'
import Balance from './Balance'
import Users from './Users'

function Dashboard() {
  return (
    <div className='h-screen w-screen bg-slate-50'>
        <div>
            <AppBar/>
        </div>
        <div className='px-4 pt-6'>
            <Balance value={1000} />
            <Users />
        </div>
    </div>
  )
}

export default Dashboard