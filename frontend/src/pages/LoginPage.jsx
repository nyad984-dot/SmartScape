import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { useAuth } from '../hooks/useAuth.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    }); 

    setError("");
  }; 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill all fields');
      return;
    };

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    };

    setLoading(true);

    try {
      await login(form);
      setForm({
        email: "",
        password: ""
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1 className="text-2xl font-semibold text-slate-100">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-400">Sign in to manage reports and city analytics.</p>
      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
          placeholder="••••••••"
          required
          type="password"
          value={form.password}
        />
        <div className="flex items-center justify-between text-sm text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input className="accent-sky-400" type="checkbox" />
            Remember me
          </label>
          <Link className="text-sky-300 font-semibold" to="/login">Forgot password?</Link>
        </div>
        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-400">
        New here? <Link className="text-sky-300 font-semibold" to="/register">Create an account</Link>
      </p>
    </Card>
  );
};
