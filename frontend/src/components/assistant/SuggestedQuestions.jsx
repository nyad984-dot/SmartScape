const questions = [
  'How should I prioritize a school-zone hazard?',
  'Summarize dashboard trends',
  'Draft a report for a traffic light outage',
]

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button
          className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-slate-300 transition hover:border-sky-300 hover:text-white"
          key={question}
          onClick={() => onSelect(question)}
          type="button"
        >
          {question}
        </button>
      ))}
    </div>
  )
}
