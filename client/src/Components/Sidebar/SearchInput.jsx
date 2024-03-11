import React, { useContext, useState } from 'react'
import useConversation from "../../zustand/useConversation"
import useGetConversations from "../../hooks/useGetConversations"
import toast from 'react-hot-toast';

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
        <label className="input input-bordered flex items-center gap-2 bg-[#F0F0F0] border-[#F0F0F0] rounded-lg h-8">
          <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" className=" bg-gray-200 placeholder:text-gray-500" placeholder={"Seach users..."} />
        </label>
      </form>

    </>
  )
}
