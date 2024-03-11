import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import NewMessages from './NewMessages'
import DropDown from './DropDown'
import UserInfo from './UserInfo'

export default function Sidebar() {
  return (
    <div className=' border-r border-slate-50 pb-4 pl-4 flex flex-col'>

      <UserInfo />

      <div className=' flex justify-between items-center gap-1'>
        <SearchInput />
        <DropDown />
      </div>

      <div className=' m-1'></div>

      <div className=' overflow-auto'>
        <NewMessages></NewMessages>
        <Conversations />
      </div>

    </div>
  )
}
