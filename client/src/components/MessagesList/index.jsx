import React, { useContext, useEffect, useState } from 'react'
import { socket, userContext } from '../../App'

export default function MessagesList({ message }) {
    const [messages, setMessages] = useState([])
    const { user } = useContext(userContext)

    useEffect(() => {
        if (!socket) return
        socket.on('messageReceived', (data) => {
            setMessages(data.messages)
        })
        return () => {
            socket.off('messageReceived')
        }
    }, [socket])

    useEffect(() => {


        socket.emit('message', { messages: [...messages, { msg: message.msg, user, date: message.date }] })
    }, [message])

    return (
        <div>
            {messages.length > 0 && messages.map((msg, index) => {
                return <div
                    style={{ backgroundColor: msg.user === user ? 'green' : 'blue' }}
                    key={msg + index}>
                    {msg.msg}

                </div>
            })}

        </div>
    )
}
