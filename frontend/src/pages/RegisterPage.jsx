import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.email || !form.password) {
      setError('Please fill all fields')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    await register(form)
    setSuccess(`Welcome, ${form.name}!`)
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <Card>
      <h1 className="text-2xl font-semibold text-slate-100">Create account</h1>
      <p className="mt-2 text-sm text-slate-400">Join City Safety AI as a resident or civic operator.</p>
      <form className="mt-6 space-y-4" onSubmit={handleRegister}>
        <Input
          label="Full Name"
          name="name"
          onChange={handleChange}
          placeholder="Shaldykenov Beibarys"
          required
          value={form.name}
        />
        <Input
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="you@city.ai"
          required
          type="email"
          value={form.email}
        />
        <Input
          label="Password"
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={form.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          required
          type="password"
          value={form.confirmPassword}
        />
        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
        {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? 'Creating account...' : 'Register'}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-400">
        Already registered? <Link className="text-sky-300 font-semibold" to="/login">Sign in</Link>
      </p>
    </Card>
  )
}
