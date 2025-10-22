import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatBox({ messages = [], onSend = () => {} }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#07080c]">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center mt-8">No messages yet. Start a conversation.</div>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))
        )}
        <div ref={bottomRef}></div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-[#09090b] flex gap-2 border-t border-white/6">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#0b1116] text-slate-200 placeholder:text-slate-400 rounded-lg p-3 outline-none border border-white/6"
        />
        <button type="submit" className="bg-gray-800 text-white px-4 rounded-lg">
          Send
        </button>
      </form>
    </div>
  )
}
