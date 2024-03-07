import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import NewMessages from './NewMessages'
import LogoutButton from './LogoutButton'

export default function Sidebar() {
  return (
    <div className=' border-r border-slate-50 p-4 flex flex-col'>
      <SearchInput />
      <div className=' divider'></div>
      <div className=' overflow-auto'>
        <NewMessages></NewMessages>
        <Conversations />
      </div>
      <LogoutButton></LogoutButton>
    </div>
  )
}
