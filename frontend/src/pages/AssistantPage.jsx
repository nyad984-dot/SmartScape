import PageHeader from '../components/common/PageHeader.jsx'
import ChatWindow from '../components/assistant/ChatWindow.jsx'
import { useAssistant } from '../hooks/useAssistant.js'

export default function AssistantPage() {
  const { messages, isTyping, sendMessage } = useAssistant()

  return (
    <>
      <PageHeader
        description="Interact with the smart city safety AI to categorize incidents, analyze priorities, or review response guidelines."
        eyebrow="AI Co-pilot"
        title="City Safety Assistant"
      />
      <div className="mt-6">
        <ChatWindow messages={messages} isTyping={isTyping} onSend={sendMessage} />
      </div>
    </>
  )
}
