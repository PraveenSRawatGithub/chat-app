import React, { useContext, useState } from 'react'
import useConversation from "../../zustand/useConversation"
import useGetConversations from "../../hooks/useGetConversations"
import toast from 'react-hot-toast';
import LogoutButton from './LogoutButton'

export default function SearchInput() {

  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) return toast.error("Seach term must be 3 characters long");

    const conversation = conversations.find(c => c.fullname.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    }
    else {
      toast.error('No such User found')
    }

  }
  return (
    <>

      <form onSubmit={handleSubmit} className=' flex gap-2 '>
        <label className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-lg h-8">
          <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" className=" bg-gray-200" placeholder={"Seach users..."} />
        </label>
        <button type='submit' className=' bg-slate-700 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className=" text-white m-2 w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </button>
      </form>

    </>
  )
}
