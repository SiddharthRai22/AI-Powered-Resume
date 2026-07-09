import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill in all fields.');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: 400, position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div className="btn-primary" style={{ width: 44, height: 44, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px' }}>
              <span className="gradient-text">Resume</span>
              <span style={{ color: '#f1f5f9' }}>AI</span>
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>Welcome back</h1>
          <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 14, marginTop: 6 }}>Sign in to continue building</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(15,17,35,0.7)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 22, padding: '36px 32px', backdropFilter: 'blur(24px)', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(241,245,249,0.55)', marginBottom: 7, letterSpacing: '0.3px', textTransform: 'uppercase' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="rgba(241,245,249,0.3)" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email" name="email" autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 14px 12px 38px', borderRadius: 12, fontSize: 14 }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(241,245,249,0.55)', marginBottom: 7, letterSpacing: '0.3px', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="rgba(241,245,249,0.3)" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPass ? 'text' : 'password'} name="password" autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 40px 12px 38px', borderRadius: 12, fontSize: 14 }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(241,245,249,0.35)', padding: 2, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(241,245,249,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(241,245,249,0.35)'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 12, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading
                ? <span className="spinner" style={{ width: 18, height: 18 }} />
                : <><span>Sign In</span><ArrowRight size={15} /></>
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(241,245,249,0.35)', marginTop: 22 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
