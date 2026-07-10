import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, Clock, Calendar, Search, Sparkles, ArrowRight } from 'lucide-react';
import { resumeService } from '../services/resumeService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TEMPLATE_META = {
  modern:     { color: '#D391B0', label: 'Modern'     },
  classic:    { color: '#9F6496', label: 'Classic'    },
  minimalist: { color: '#BA6E8F', label: 'Minimalist' },
  creative:   { color: '#7B466A', label: 'Creative'   },
};

function timeAgo(d) {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    resumeService.getAll()
      .then(setResumes)
      .catch(() => toast.error('Failed to load resumes.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id, title) => {
    setDeleteTarget({ id, title });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setDeleting(id);
    try {
      await resumeService.delete(id);
      setResumes(prev => prev.filter(r => r.id !== id));
      toast.success('Resume deleted.');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete.');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = resumes.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 60, background: '#0C0420' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 900, color: '#F3EAF5', letterSpacing: '-0.5px' }}>
              Good {getGreeting()},{' '}
              <span className="gradient-text">{user?.fullName?.split(' ')[0]}</span> 👋
            </h1>
            <p style={{ color: 'rgba(243,234,245,0.4)', fontSize: 14, marginTop: 5 }}>
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''} in your workspace
            </p>
          </div>
          <Link to="/templates" className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 12, fontSize: 14, textDecoration: 'none', flexShrink: 0 }}>
            <Plus size={16} /> New Resume
          </Link>
        </div>

        {/* Search */}
        {resumes.length > 0 && (
          <div className="animate-fade-in-up delay-100" style={{ marginBottom: 24, position: 'relative', maxWidth: 320 }}>
            <Search size={14} color="rgba(241,245,249,0.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              className="input-field"
              placeholder="Search resumes…"
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 34px', borderRadius: 12, fontSize: 13 }}
            />
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
            <div className="spinner" style={{ width: 32, height: 32 }} />
          </div>
        ) : filtered.length === 0 && resumes.length === 0 ? (
          /* Empty State */
          <div className="animate-fade-in-up delay-200" style={{ textAlign: 'center', paddingTop: 60, paddingBottom: 60 }}>
            <div className="btn-primary animate-float" style={{ width: 80, height: 80, borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Sparkles size={34} color="#fff" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F3EAF5', marginBottom: 10 }}>No resumes yet</h2>
            <p style={{ color: 'rgba(243,234,245,0.4)', fontSize: 14, maxWidth: 300, margin: '0 auto 28px', lineHeight: 1.6 }}>
              Create your first AI-powered resume. Pick a template to get started.
            </p>
            <Link to="/templates" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 12, fontSize: 15, textDecoration: 'none' }}>
              <Plus size={16} /> Create your first resume <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map((resume) => {
              const tmpl = TEMPLATE_META[resume.templateId] || { color: '#6366f1', label: resume.templateId };
              const isHovered = hoveredCard === resume.id;
              return (
                <div key={resume.id}
                  className="animate-fade-in-up"
                  onMouseEnter={() => setHoveredCard(resume.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: 'rgba(12,4,32,0.7)', border: `1px solid ${isHovered ? 'rgba(211,145,176,0.35)' : 'rgba(211,145,176,0.14)'}`,
                    borderRadius: 18, overflow: 'hidden', transition: 'all 0.25s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                    boxShadow: isHovered ? '0 20px 60px rgba(211,145,176,0.18)' : '0 2px 12px rgba(0,0,0,0.25)',
                  }}>

                  {/* Thumbnail */}
                  <div style={{ height: 140, background: `linear-gradient(145deg, ${tmpl.color}18, rgba(11,13,26,0.8))`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 80, height: 104, background: '#fff', borderRadius: 8, boxShadow: '0 6px 30px rgba(0,0,0,0.4)', padding: 8 }}>
                      <div style={{ height: 10, borderRadius: 3, background: tmpl.color, marginBottom: 6 }} />
                      {[70, 55, 80, 50, 65].map((w, j) => (
                        <div key={j} style={{ height: 5, borderRadius: 2, background: '#e5e7eb', marginBottom: 4, width: `${w}%` }} />
                      ))}
                    </div>

                    {/* Hover overlay */}
                    {isHovered && (
                      <div className="animate-fade-in" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <button onClick={() => navigate(`/editor/${resume.id}`)} className="btn-primary"
                          style={{ padding: '8px 18px', borderRadius: 10, fontSize: 13, cursor: 'pointer', border: 'none' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(resume.id, resume.title)} disabled={deleting === resume.id}
                          style={{ padding: '8px', borderRadius: 10, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <h3 style={{ fontWeight: 600, color: '#F3EAF5', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{resume.title}</h3>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 99, background: `${tmpl.color}18`, color: tmpl.color, flexShrink: 0 }}>
                        {tmpl.label}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(243,234,245,0.35)' }}>
                        <Clock size={10} /> {timeAgo(resume.updatedAt)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(243,234,245,0.35)' }}>
                        <Calendar size={10} /> {new Date(resume.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: 400, borderRadius: 20, padding: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.5)', background: '#180828' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F3EAF5', marginBottom: 10 }}>Do you want to delete this file?</h3>
              <p style={{ fontSize: 13, color: 'rgba(243,234,245,0.5)', marginBottom: 24, lineHeight: 1.5 }}>
                Delete "{deleteTarget.title}"? This action cannot be undone and you will lose all progress on this resume.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button onClick={() => setDeleteTarget(null)} className="btn-secondary" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={deleting === deleteTarget.id} className="btn-primary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, cursor: 'pointer', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)', border: 'none', color: '#fff', fontWeight: 600 }}>
                  {deleting === deleteTarget.id ? <span className="spinner" style={{ width: 14, height: 14 }} /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
