import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import MessagesList from './components/MessagesList'


export const socket = io('http://localhost:4000')
export const userContext = createContext()
export default function App() {
  const [user, setUser] = useState()
  const [message, setMessage] = useState({})
  const [timestamp, setTimestamp] = useState(new Date())
  const [inputValue, setInputValue] = useState('')

  const setMessageFromInput = (e) => {
    const timestamp = new Date().getTime()
    const newMessage = inputValue
    setMessage({ msg: newMessage, date: timestamp })
    // setMessage((prevMessages) => [...prevMessages, { msg: e.target.value, user, timestamp }])
    // socket.emit('message', { message })
    setInputValue('')
  }
  useEffect(() => {
    if (!socket) return

    socket.on('connected', (data) => {
      setUser(data)
    })
  }, [socket])

  // socket.emit('message', { messages: [...messages, { msg: message, user }] })
  return (
    <userContext.Provider value={{ user, setUser }}>
      <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setMessageFromInput(e)

            }
          }} />
        <MessagesList message={message} />
      </div>
    </userContext.Provider>
  )
}
