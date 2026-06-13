import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phone: '',
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

    if (!form.phone || !form.password) {
      setError('Please fill all fields');
      return;
    };

    if (form.phone.length !== 11) {
      setError('Phone number must be exactly 11 digits');
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    };

    setLoading(true);

    try {
      await login(form);
      setForm({
        phone: "",
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
      <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">Sign in to manage reports and city analytics.</p>
      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
          placeholder="••••••••"
          required
          type="password"
          value={form.password}
        />
        <div className="flex items-center justify-between text-sm text-slate-500">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input className="accent-sky-400" type="checkbox" />
            Remember me
          </label>
          <Link className="text-sky-600 font-semibold" to="/login">Forgot password?</Link>
        </div>
        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        New here? <Link className="text-sky-600 font-semibold" to="/register">Create an account</Link>
      </p>
    </Card>
  );
};
