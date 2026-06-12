export default function TypingIndicator() {
  return (
    <div className="flex w-fit gap-1 rounded-lg bg-slate-800 px-4 py-3">
      {[0, 1, 2].map((item) => (
        <span className="h-2 w-2 animate-pulse rounded-full bg-sky-300" key={item} />
      ))}
    </div>
  )
}
