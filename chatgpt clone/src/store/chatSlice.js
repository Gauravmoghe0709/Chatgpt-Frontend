import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  chats: [],
  currentChatId: null,
  messagesByChat: {},
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: {
      reducer(state, action) {
        const { id, title } = action.payload
        if (!state.chats) state.chats = []
        state.chats.unshift({ id, title: title || "new chat" })
        state.currentChatId = id
      },
      prepare(arg) {
        if (typeof arg === 'string') {
          return { payload: { id: nanoid(), title: arg } }
        }
        return { payload: { id: arg.id || nanoid(), title: arg.title } }
      },
    },
    selectChat(state, action) {
      state.currentChatId = action.payload
    },
    addMessage(state, action) {
      const { chatId, from, text } = action.payload
      if (!state.messagesByChat[chatId]) state.messagesByChat[chatId] = []
      state.messagesByChat[chatId].push({ from, text, id: nanoid() })
      const chat = state.chats.find((c) => c.id === chatId)
      if (chat) chat.preview = text
    },
    setMessages(state, action) {
      const { chatId, messages } = action.payload
      state.messagesByChat[chatId] = messages.map((m) => ({ id: m._id || nanoid(), from: m.role === 'model' ? 'ai' : 'user', text: m.content }))
      const last = state.messagesByChat[chatId][state.messagesByChat[chatId].length - 1]
      const chat = state.chats.find((c) => c.id === chatId)
      if (chat && last) chat.preview = last.text
    },
    clearChats(state) {
      state.chats = []
      state.messagesByChat = {}
      state.currentChatId = null
    },
    setchats(state,action){
      state.chats = action.payload

    }
  },
})

export const { createChat, selectChat, addMessage, clearChats, setchats, setMessages } = chatSlice.actions
export default chatSlice.reducer
