import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import SuggestedQuestions from './SuggestedQuestions'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow({ messages, isTyping, onSend }) {
  return (
    <div className="glass flex min-h-[620px] flex-col rounded-lg p-5">
      <SuggestedQuestions onSelect={onSend} />
      <div className="my-5 flex-1 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      <ChatInput onSend={onSend} />
    </div>
  )
}
