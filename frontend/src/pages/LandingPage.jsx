import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Shield, Download, Star, FileText, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TEMPLATES = [
  { id: 'modern',     name: 'Modern',     desc: 'Two-column with accent sidebar',     accent: '#6366f1', bg: '#1e1b4b' },
  { id: 'classic',    name: 'Classic',    desc: 'Traditional professional layout',    accent: '#10b981', bg: '#064e3b' },
  { id: 'minimalist', name: 'Minimalist', desc: 'Ultra-clean, whitespace-focused',    accent: '#f59e0b', bg: '#451a03' },
  { id: 'creative',   name: 'Creative',   desc: 'Bold color blocks, standout design', accent: '#a78bfa', bg: '#2e1065' },
];

const FEATURES = [
  { icon: Sparkles,   title: 'AI-Powered Writing',   desc: 'Generate and improve every section using Google Gemini AI with expert prompts.' },
  { icon: Zap,        title: 'Real-Time Preview',    desc: 'See your resume update instantly as you type — no refresh, no lag.' },
  { icon: Shield,     title: 'ATS Optimized',        desc: 'Built-in ATS analyzer gives you a score and exact improvement tips.' },
  { icon: Download,   title: 'PDF Export',           desc: 'Download a pixel-perfect, print-ready PDF in one click.' },
  { icon: FileText,   title: '4 Pro Templates',      desc: 'Modern, Classic, Minimalist, Creative — all recruiter-approved.' },
  { icon: TrendingUp, title: 'Career-Grade Prompts', desc: 'Prompts tuned on thousands of successful resumes for maximum impact.' },
];

const STATS = [
  { value: '10K+', label: 'Resumes Created' },
  { value: '94%',  label: 'Interview Rate'  },
  { value: '4',    label: 'Pro Templates'   },
  { value: '100%', label: 'Free to Use'     },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#0b0d1a' }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', paddingTop: 120, paddingBottom: 80, textAlign: 'center', overflow: 'hidden' }}>
        {/* Orb backgrounds */}
        <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 200, left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} className="animate-float" />
        <div style={{ position: 'absolute', top: 280, right: '10%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          {/* Badge */}
          <div className="animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 99, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 28, fontWeight: 500 }}>
            <Sparkles size={13} color="#818cf8" />
            AI-Powered Resume Builder · Completely Free
            <span style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} className="animate-float" />
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1.5px', color: '#f1f5f9', marginBottom: 20 }}>
            Build Resumes That{' '}
            <span className="gradient-text">Actually Get</span>
            <br />Interviews
          </h1>

          <p className="animate-fade-in-up delay-200" style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(241,245,249,0.5)', maxWidth: 580, margin: '0 auto 36px', fontWeight: 300, lineHeight: 1.7 }}>
            Harness the power of Google Gemini AI to craft ATS-optimized, professionally designed resumes in minutes — not hours.
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up delay-300" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to={user ? '/dashboard' : '/register'} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 30px', borderRadius: 14, fontSize: 15, textDecoration: 'none' }}>
              <Sparkles size={17} />
              {user ? 'Go to Dashboard' : 'Start Building Free'}
              <ArrowRight size={15} />
            </Link>
            <Link to="/templates" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, fontSize: 15, textDecoration: 'none' }}>
              <FileText size={17} />
              Browse Templates
            </Link>
          </div>

          {/* Stars */}
          <div className="animate-fade-in-up delay-400" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 24 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
            <span style={{ color: 'rgba(241,245,249,0.35)', fontSize: 12, marginLeft: 5 }}>Loved by 10,000+ developers</span>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '20px 24px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
          {STATS.map(({ value, label }) => (
            <div key={label} className="glass card-hover" style={{ borderRadius: 18, padding: '22px 16px', textAlign: 'center' }}>
              <p className="gradient-text" style={{ fontSize: 34, fontWeight: 900, lineHeight: 1 }}>{value}</p>
              <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 12, marginTop: 4, fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Templates ─────────────────────────────────────────────────── */}
      <section style={{ padding: '20px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>Professional Templates</h2>
            <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 15, marginTop: 10, maxWidth: 480, margin: '10px auto 0' }}>
              Every template is ATS-tested and recruiter-approved. Switch between them instantly.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {TEMPLATES.map((t, i) => (
              <Link
                key={t.id}
                to={user ? `/editor/new?template=${t.id}` : '/register'}
                className={`glass card-hover animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{ borderRadius: 20, overflow: 'hidden', textDecoration: 'none', display: 'block' }}
              >
                {/* Thumbnail */}
                <div style={{ height: 190, background: `linear-gradient(145deg, ${t.bg}, #0b0d1a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 110, height: 145, background: '#fff', borderRadius: 10, boxShadow: '0 8px 40px rgba(0,0,0,0.5)', padding: 10 }}>
                    <div style={{ height: 14, borderRadius: 4, background: t.accent, marginBottom: 8 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[75, 60, 85, 55, 70].map((w, j) => (
                        <div key={j} style={{ height: 6, borderRadius: 3, background: '#e5e7eb', width: `${w}%` }} />
                      ))}
                    </div>
                    <div style={{ height: 1, background: '#f3f4f6', margin: '8px 0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {[100, 90, 80].map((w, j) => (
                        <div key={j} style={{ height: 5, borderRadius: 3, background: '#f3f4f6', width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,13,26,0.5), transparent)' }} />
                </div>
                {/* Info */}
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.accent, flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 14 }}>{t.name}</span>
                  </div>
                  <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 12, lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section style={{ padding: '20px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>Everything You Need</h2>
            <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 15, marginTop: 10, maxWidth: 480, margin: '10px auto 0' }}>
              A complete toolkit to build, optimize, and download your perfect resume.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass card-hover" style={{ borderRadius: 20, padding: '28px 24px' }}>
                <div className="btn-primary" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={19} color="#fff" />
                </div>
                <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="glass" style={{ borderRadius: 28, padding: 'clamp(36px, 6vw, 64px)', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 14 }}>
                Ready to Land Your <span className="gradient-text">Dream Job?</span>
              </h2>
              <p style={{ color: 'rgba(241,245,249,0.45)', fontSize: 15, marginBottom: 28 }}>
                Join thousands of professionals building standout resumes with AI.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 18 }}>
                {['No credit card', 'No limits', '100% free'].map(perk => (
                  <span key={perk} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(241,245,249,0.5)' }}>
                    <CheckCircle size={12} color="#4ade80" /> {perk}
                  </span>
                ))}
              </div>
              <Link to={user ? '/dashboard' : '/register'} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 14, fontSize: 15, textDecoration: 'none' }}>
                <Sparkles size={17} />
                {user ? 'Build a Resume' : "Get Started — It's Free"}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="btn-primary" style={{ width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={12} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 13 }}>
            <span className="gradient-text">Resume</span>
            <span style={{ color: '#f1f5f9' }}>AI</span>
          </span>
          <span style={{ color: 'rgba(241,245,249,0.2)', fontSize: 12, marginLeft: 12 }}>© 2024 · Built for developers</span>
        </div>
      </footer>
    </div>
  );
}
