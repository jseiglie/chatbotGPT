import React, { useState } from "react";

export const ChatBot = () => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" }
        setMessages([...messages, userMessage])
        setInput('')
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    //recuerda que necesitas una api key para poder realizar el pedido despues del espacio de Bearer
                    Authorization: 'Bearer '
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...messages.map(msg => ({ role: msg.sender, content: msg.text })),
                        { role: 'user', content: input }
                    ]
                })
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`)
            }
            const data = await response.json()
            const botMessages = {
                text: data.choices[0].message.content.trim(),
                sender: 'assistant'
            }
            setMessages(prev=> [...prev, botMessages]);
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="chat-container">
            <div className="chat-box">
                {
                    messages.map((msg, index) => <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>)
                }
            </div>
            <div className="input-container">
                <input type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key == 'Enter' && handleSendMessage()}
                    placeholder="escribir mensaje"
                />
            </div>
            <button onClick={handleSendMessage}>
                Enviar
            </button>
        </div>


    )
}