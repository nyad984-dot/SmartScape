import { useState } from 'react'
import { assistantService } from '../services/assistantService.js'
import { initialChatMessages } from '../utils/mockData.js'

export function useAssistant() {
  const [messages, setMessages] = useState(initialChatMessages)
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (content) => {
    if (!content.trim()) return
    const userMessage = { id: Date.now(), role: 'user', content }
    setMessages((current) => [...current, userMessage])
    setIsTyping(true)
    const response = await assistantService.sendMessage(content)
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', content: response },
      ])
      setIsTyping(false)
    }, 500)
  }

  return { messages, isTyping, sendMessage };
};
