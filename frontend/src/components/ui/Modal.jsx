import { X } from 'lucide-react'
import Button from './Button.jsx'

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4">
      <div className="glass w-full max-w-lg rounded-lg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Button aria-label="Close modal" icon={X} onClick={onClose} variant="ghost" />
        </div>
        {children}
      </div>
    </div>
  )
}
