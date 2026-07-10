import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) return toast.error('Please fill in all fields.');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await register(form.fullName, form.email, form.password);
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(211,145,176,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: 420, position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div className="btn-primary" style={{ width: 44, height: 44, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px' }}>
              <span className="gradient-text">Resume</span>
              <span style={{ color: '#f1f5f9' }}>AI</span>
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#F3EAF5', letterSpacing: '-0.5px' }}>Create your account</h1>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(12,4,32,0.75)', border: '1px solid rgba(211,145,176,0.22)', borderRadius: 22, padding: '36px 32px', backdropFilter: 'blur(24px)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          <form onSubmit={handleSubmit}>

            {[
              { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User, auto: 'name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', icon: Mail, auto: 'email' },
            ].map(({ name, label, type, placeholder, icon: Icon, auto }) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(243,234,245,0.6)', marginBottom: 7, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <Icon size={15} color="rgba(241,245,249,0.3)" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type={type} name={name} autoComplete={auto}
                    placeholder={placeholder} value={form[name]} onChange={handleChange}
                    className="input-field"
                    style={{ width: '100%', padding: '12px 14px 12px 38px', borderRadius: 12, fontSize: 14 }}
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(243,234,245,0.6)', marginBottom: 7, letterSpacing: '0.3px', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="rgba(241,245,249,0.3)" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPass ? 'text' : 'password'} name="password" autoComplete="new-password"
                  placeholder="Min. 6 characters" value={form.password} onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 40px 12px 38px', borderRadius: 12, fontSize: 14 }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(241,245,249,0.35)', padding: 2, transition: 'color 0.2s' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 12, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading
                ? <span className="spinner" style={{ width: 18, height: 18 }} />
                : <><span>Create Account</span><ArrowRight size={15} /></>
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(243,234,245,0.4)', marginTop: 22 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#D391B0', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
