import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [token, setToken] = useState('')

  const [form, setForm] = useState({
    phone: '',
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

    if (!form.phone || !form.password) {
      setError('Please fill all fields')
      return
    }

    if (form.phone.length !== 11) {
      setError('Phone number must be exactly 11 digits')
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
    try {
      await register(form)
      setSuccess('Account created! Redirecting...')
      setLoading(false)
      navigate('/assistant')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Card>
      <h1 className="text-2xl font-semibold text-slate-800">Create account</h1>
      <p className="mt-2 text-sm text-slate-500">Join SmartScape to manage your district.</p>
      <form className="mt-6 space-y-4" onSubmit={handleRegister}>
        <Input
          label="Phone Number"
          name="phone"
          onChange={handleChange}
          placeholder="87771234567"
          required
          type="tel"
          value={form.phone}
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
      <p className="mt-5 text-center text-sm text-slate-500">
        Already registered? <Link className="text-sky-600 font-semibold" to="/login">Sign in</Link>
      </p>
    </Card>
  )
}
