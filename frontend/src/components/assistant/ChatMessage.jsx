import { Bot, User } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky-400 text-slate-950">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
          isUser ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-100'
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-800 text-slate-200">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
