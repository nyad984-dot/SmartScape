export default function Card({ children, className = '' }) {
  return <div className={`glass rounded-lg p-5 ${className}`}>{children}</div>
}
