import { useDispatch, useSelector } from 'react-redux'
import { createChat, setchats, selectChat, setMessages } from '../store/chatSlice'
import axios from "axios"
import { useEffect } from 'react'


export default function Sidebar({ open, onClose }) {
  const dispatch = useDispatch()
  const chats = useSelector((s) => s.chat.chats)

  const handleNew = async () => {
    const title = prompt('Enter chat name', 'New chat')
    if (!title) return
    const response = await axios.post("http://localhost:3000/userchats", { title }, { withCredentials: true })
    console.log(response)
    dispatch(createChat({ id: response.data.chat._id, title: response.data.chat.title }))
  }

  useEffect(() => {
    axios.get("http://localhost:3000/userchats/getchats", { withCredentials: true })
      .then((res) => {
        console.log(res)
        dispatch(setchats(res.data.chat))
      }).catch((Error) => {
        console.log(Error)
      })

  }, [])

  async function handleSelect(chatid) {


    try {
      const response = await axios.get(`http://localhost:3000/userchats/${chatid}`, { withCredentials: true })
      console.log(response)
      dispatch(setMessages({ chatId: chatid, messages: response.data.messages }))
      dispatch(selectChat(chatid))
      onClose()

    } catch (error) {
      console.log(error)

    }
  }


  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 bg-black/40 z-10 md:hidden"></div>}

      <aside className={`fixed md:static z-20 w-64 bg-[#0b0f14] text-slate-200 h-full shadow-md flex flex-col transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex justify-between items-center p-4 border-b border-white/6">
          <h2 className="font-semibold">Chats</h2>
          <button onClick={handleNew} className="text-sm bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-600">New</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {(!chats || chats.length === 0) ? (
            <p className="text-slate-400 text-sm p-4">No previous chats</p>
          ) : (
            chats.map((chat) => (
              <button key={chat.id} onClick={() => handleSelect(chat.id)} className="w-full text-left px-4 py-3 hover:bg-white/2 border-b border-white/6">
                <div className="font-medium">{chat.title}</div>
                <div className="text-sm text-slate-400">{""}</div>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
