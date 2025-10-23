import { useState,useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { createChat, addMessage} from '../store/chatSlice'
import axios from 'axios'
import { io, Socket } from "socket.io-client";


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const chats = useSelector((s) => s.chat.chats)
  const currentChatId = useSelector((s) => s.chat.currentChatId)
  const messagesByChat = useSelector((s) => s.chat.messagesByChat)
  const currentMessages = currentChatId ? messagesByChat[currentChatId] || [] : []
  const socketRef = useRef(null)
  

  const handleSendMessage = async (message) => {
    if (!message || !message.trim()) return

    let activeChatId = currentChatId
    if (!activeChatId) {
      try {
        const res = await axios.post('https://chatgpt-backend-jr20.onrender.com/userchats', { title: 'Conversation' }, { withCredentials: true })
        const serverChat = res.data.chat
        dispatch(createChat({ id: serverChat._id, title: serverChat.title }))
        activeChatId = serverChat._id
      } catch (err) {
        console.error('failed to create chat on server', err)
        return
      }
    }

    dispatch(addMessage({ chatId: activeChatId, from: 'user', text: message }))

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('ai-message', { chat: activeChatId, content: message })
    }
  }

  useEffect(() => {
    const temp = io("https://chatgpt-backend-jr20.onrender.com", { withCredentials: true })
    socketRef.current = temp

    const onAiResponse = (payload) => {
      if (!payload) return
      const { chatId, content } = payload
      const targetChat = chatId || currentChatId
      if (!targetChat) return
      dispatch(addMessage({ chatId: targetChat, from: 'ai', text: content }))
    }

  temp.on('connect', () => console.log('socket connected', temp.id))
  temp.on('connect_error', (err) => console.error('socket connect_error', err))
  temp.on('disconnect', (reason) => console.log('socket disconnected', reason))
  temp.on('ai-response', onAiResponse)

    return () => {
      temp.off('ai-response', onAiResponse)
      temp.disconnect()
      socketRef.current = null
    }
  }, [dispatch, currentChatId])
  

  return (
    <div className="flex h-screen bg-[#05060a] text-slate-200">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between bg-[#0b1116] shadow p-4 border-b border-white/6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded bg-transparent">
            ☰
          </button>
          <h1 className="text-lg font-semibold">AI Chat</h1>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#07080c]">
          <ChatBox messages={currentMessages.map((m) => ({ role: m.from === 'user' ? 'user' : 'ai', content: m.text }))} onSend={handleSendMessage} />
        </main>
      </div>
    </div>
  )
}
