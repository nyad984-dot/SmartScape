import { Send } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button.jsx'

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('')

  const submit = (event) => {
    event.preventDefault()
    onSend(value)
    setValue('')
  }

  return (
    <form className="flex gap-2 border-t border-slate-800 pt-4" onSubmit={submit}>
      <input
        className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none focus:border-sky-300"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask about incident priority, routing, or trends"
        value={value}
      />
      <Button icon={Send} type="submit">
        Send
      </Button>
    </form>
  )
}
