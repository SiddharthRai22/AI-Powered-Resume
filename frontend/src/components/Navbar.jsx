import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LayoutDashboard, FileText, LogOut, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('#user-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setDropdownOpen(false); };
  const isActive = (path) => location.pathname.startsWith(path);

  const navLinks = user
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/templates', label: 'Templates',  icon: FileText },
      ]
    : [];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? 'rgba(12,4,32,0.96)' : 'rgba(12,4,32,0.80)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: scrolled ? '1px solid rgba(211,145,176,0.2)' : '1px solid rgba(211,145,176,0.08)',
    transition: 'all 0.3s ease',
  };

  return (
    <header style={navStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 64 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div className="btn-primary" style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={15} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.3px' }}>
            <span className="gradient-text">Resume</span>
            <span style={{ color: '#f1f5f9' }}>AI</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 32, flex: 1 }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500,
                textDecoration: 'none',
                background: isActive(to) ? 'rgba(211,145,176,0.15)' : 'transparent',
                color: isActive(to) ? '#D391B0' : 'rgba(243,234,245,0.65)',
                border: isActive(to) ? '1px solid rgba(211,145,176,0.3)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isActive(to)) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(211,145,176,0.08)'; }}}
              onMouseLeave={e => { if (!isActive(to)) { e.currentTarget.style.color = 'rgba(243,234,245,0.65)'; e.currentTarget.style.background = 'transparent'; }}}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
          {user ? (
            <div id="user-dropdown" style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px 6px 6px', borderRadius: 12,
                  background: 'rgba(93,60,100,0.3)', border: '1px solid rgba(211,145,176,0.2)',
                  cursor: 'pointer', color: '#F3EAF5', transition: 'all 0.2s',
                }}
              >
                <div className="btn-primary" style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>
                  {user.fullName?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.fullName?.split(' ')[0]}
                </span>
                <ChevronDown size={13} color="rgba(241,245,249,0.4)" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {dropdownOpen && (
                <div className="animate-fade-in" style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 220, borderRadius: 14, padding: '8px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)', zIndex: 200,
                  background: '#180828', border: '1px solid rgba(211,145,176,0.2)',
                  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)'
                }}>
                  <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid rgba(211,145,176,0.12)' }}>
                    <p style={{ fontSize: 11, color: 'rgba(243,234,245,0.45)', marginBottom: 4, fontWeight: 500 }}>Signed in as</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#F3EAF5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, fontSize: 13, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s', marginTop: 6, fontWeight: 500 }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 13, fontWeight: 500, color: 'rgba(243,234,245,0.65)', textDecoration: 'none', padding: '7px 12px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,234,245,0.65)'}
              >Sign in</Link>
              <Link to="/register" className="btn-primary" style={{ fontSize: 13, padding: '8px 18px', borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}>
                Get Started
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{ display: 'none', padding: 8, borderRadius: 8, background: 'rgba(93,60,100,0.3)', border: '1px solid rgba(211,145,176,0.2)', cursor: 'pointer', color: 'rgba(243,234,245,0.7)' }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

       {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in" style={{ borderTop: '1px solid rgba(211,145,176,0.12)', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 4, background: '#0C0420' }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, fontSize: 14, fontWeight: 500, color: 'rgba(243,234,245,0.8)', textDecoration: 'none' }}
            >
              <Icon size={16} />{label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { handleLogout(); setMobileOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, fontSize: 14, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
            >
              <LogOut size={16} /> Sign out
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid rgba(211,145,176,0.12)' }}>
              <Link to="/login" onClick={() => setMobileOpen(false)} style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: 14, color: 'rgba(243,234,245,0.7)', textDecoration: 'none', borderRadius: 10 }}>Sign in</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: 14, textDecoration: 'none', borderRadius: 10 }}>Get Started</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; align-items: center; }
          nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
