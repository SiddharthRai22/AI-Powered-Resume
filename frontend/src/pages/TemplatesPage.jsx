import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { resumeService } from '../services/resumeService';
import toast from 'react-hot-toast';

const TEMPLATES = [
  { id: 'modern',     name: 'Modern',     desc: 'Two-column with a sleek sidebar. Great for tech roles.',                 accent: '#6366f1', bg: '#1e1b4b', tags: ['Popular', 'Tech']     },
  { id: 'classic',    name: 'Classic',    desc: 'Traditional single-column. Timeless and universally accepted.',           accent: '#10b981', bg: '#064e3b', tags: ['Corporate', 'Safe']   },
  { id: 'minimalist', name: 'Minimalist', desc: 'Ultra-clean with generous whitespace. Lets your content shine.',          accent: '#f59e0b', bg: '#451a03', tags: ['Clean', 'Modern']     },
  { id: 'creative',   name: 'Creative',   desc: 'Bold color blocks and standout design. Perfect for creative roles.',      accent: '#a78bfa', bg: '#2e1065', tags: ['Design', 'Standout']  },
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('modern');
  const [creating, setCreating] = useState(false);

  const handleUse = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const resume = await resumeService.create({
        title: `My ${TEMPLATES.find(t => t.id === selected)?.name} Resume`,
        templateId: selected,
      });
      navigate(`/editor/${resume.id}`);
    } catch {
      toast.error('Failed to create resume.');
    } finally {
      setCreating(false);
    }
  };

  const selectedTemplate = TEMPLATES.find(t => t.id === selected);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 80, background: '#0b0d1a', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '20%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 16px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 99, fontSize: 12, color: 'rgba(241,245,249,0.65)', fontWeight: 500, marginBottom: 20 }}>
            <Sparkles size={12} color="#818cf8" /> 4 Professional Templates
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 12 }}>
            Choose Your <span className="gradient-text">Template</span>
          </h1>
          <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>
            Every template is ATS-optimized. Switch between them anytime in the editor.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, marginBottom: 44 }}>
          {TEMPLATES.map((t, i) => {
            const isSelected = selected === t.id;
            return (
              <button key={t.id}
                onClick={() => setSelected(t.id)}
                className={`animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{
                  textAlign: 'left', border: 'none', cursor: 'pointer', padding: 0,
                  background: 'rgba(15,17,35,0.6)',
                  outline: isSelected ? `2px solid ${t.accent}` : '2px solid transparent',
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: isSelected ? `0 0 0 4px ${t.accent}22, 0 20px 60px ${t.accent}30` : '0 2px 12px rgba(0,0,0,0.25)',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}>

                {/* Preview */}
                <div style={{ height: 200, background: `linear-gradient(145deg, ${t.bg} 0%, #0b0d1a 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 120, height: 156, background: '#fff', borderRadius: 10, boxShadow: '0 8px 40px rgba(0,0,0,0.5)', padding: 10 }}>
                    <div style={{ height: 14, borderRadius: 4, background: t.accent, marginBottom: 8 }} />
                    {[80, 60, 90, 55, 75].map((w, j) => (
                      <div key={j} style={{ height: 6, borderRadius: 3, background: '#e5e7eb', marginBottom: 5, width: `${w}%` }} />
                    ))}
                    <div style={{ height: 1, background: '#f3f4f6', margin: '8px 0' }} />
                    {[100, 85, 70].map((w, j) => (
                      <div key={j} style={{ height: 5, borderRadius: 3, background: '#f3f4f6', marginBottom: 4, width: `${w}%` }} />
                    ))}
                    {isSelected && (
                      <div style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: '50%', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${t.accent}60` }}>
                        <Check size={14} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,13,26,0.4), transparent)' }} />
                </div>

                {/* Info */}
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: t.accent, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 15 }}>{t.name}</span>
                  </div>
                  <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 12, lineHeight: 1.55, marginBottom: 10 }}>{t.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 99, background: `${t.accent}20`, color: t.accent }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-500" style={{ textAlign: 'center' }}>
          <button onClick={handleUse} disabled={creating} className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 36px', borderRadius: 14, fontSize: 16, cursor: creating ? 'not-allowed' : 'pointer', opacity: creating ? 0.7 : 1 }}>
            {creating
              ? <span className="spinner" style={{ width: 20, height: 20 }} />
              : <><Sparkles size={18} /> Use {selectedTemplate?.name} Template <ArrowRight size={16} /></>
            }
          </button>
          <p style={{ color: 'rgba(241,245,249,0.25)', fontSize: 12, marginTop: 10 }}>
            You can switch templates anytime in the editor
          </p>
        </div>
      </div>
    </div>
  );
}
