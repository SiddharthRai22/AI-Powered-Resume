import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Zap } from 'lucide-react';
import { resumeService } from '../services/resumeService';
import toast from 'react-hot-toast';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Two-column layout with a sleek dark header and royal-blue accents. Built for tech and finance roles.',
    accent: '#2563EB',
    accentLight: '#DBEAFE',
    headerBg: '#0F172A',
    tags: ['Popular', 'Tech', 'Finance'],
    preview: 'modern',
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Timeless single-column design with refined typography. Universally accepted by ATS and recruiters.',
    accent: '#374151',
    accentLight: '#F9FAFB',
    headerBg: '#1C1C1E',
    tags: ['Corporate', 'Safe', 'ATS'],
    preview: 'classic',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    desc: 'Editorial whitespace-driven layout. Let your content breathe with ultra-clean, refined typography.',
    accent: '#6B7280',
    accentLight: '#F3F4F6',
    headerBg: '#111827',
    tags: ['Clean', 'Modern', 'Design'],
    preview: 'minimalist',
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Bold gradient header, timeline experience, and vivid accents. Perfect for design and creative roles.',
    accent: '#7C3AED',
    accentLight: '#F5F3FF',
    headerBg: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
    tags: ['Standout', 'Design', 'Bold'],
    preview: 'creative',
  },
];

// Scaled-down preview miniature for each template
function TemplatePreview({ template, isSelected }) {
  const { preview, accent, headerBg } = template;

  if (preview === 'modern') {
    return (
      <div style={{ width: 110, height: 148, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', flexShrink: 0 }}>
        <div style={{ background: '#0F172A', padding: '7px 8px 6px' }}>
          <div style={{ width: 50, height: 5, borderRadius: 2, background: '#fff', marginBottom: 3 }} />
          <div style={{ width: 34, height: 3, borderRadius: 2, background: '#2563EB', marginBottom: 5 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {[28, 22, 26].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.35)', width: w }} />)}
          </div>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }} />
        <div style={{ display: 'flex', flex: 1, height: 'calc(100% - 35px)' }}>
          <div style={{ flex: 1, padding: '5px 6px' }}>
            <div style={{ height: 2, width: 28, background: '#2563EB', marginBottom: 3, borderRadius: 1 }} />
            {[60, 80, 55, 70, 45].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', marginBottom: 2, width: `${w}%` }} />)}
            <div style={{ height: 2, width: 32, background: '#2563EB', margin: '5px 0 3px', borderRadius: 1 }} />
            {[50, 75, 65, 40].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', marginBottom: 2, width: `${w}%` }} />)}
          </div>
          <div style={{ width: 32, background: '#F8FAFC', borderLeft: '1px solid #E5E7EB', padding: '5px 4px' }}>
            <div style={{ height: 2, width: 20, background: '#374151', marginBottom: 3, borderRadius: 1 }} />
            {[16, 18, 14].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#D1D5DB', marginBottom: 2, width: w }} />)}
            <div style={{ height: 2, width: 20, background: '#374151', margin: '4px 0 3px', borderRadius: 1 }} />
            {[20, 16, 18, 14].map((w, i) => <div key={i} style={{ height: 6, borderRadius: 99, background: '#DBEAFE', border: '1px solid #BFDBFE', marginBottom: 2, width: w }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (preview === 'classic') {
    return (
      <div style={{ width: 110, height: 148, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', padding: '10px 8px 8px', flexShrink: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ height: 6, width: 60, background: '#1C1C1E', borderRadius: 1, margin: '0 auto 3px' }} />
          <div style={{ height: 2, width: 36, background: '#9E9E9E', borderRadius: 1, margin: '0 auto 4px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            {[18, 14, 16].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#D1D5DB', width: w }} />)}
          </div>
        </div>
        <div style={{ height: 1.5, background: 'linear-gradient(90deg, #1C1C1E 0%, #9E9E9E 60%, transparent 100%)', marginBottom: 5 }} />
        {[0, 1, 2].map((s) => (
          <div key={s} style={{ marginBottom: 6 }}>
            <div style={{ height: 2, width: 32, background: '#1C1C1E', borderRadius: 1, marginBottom: 2 }} />
            {[60, 80, 50, 70].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', marginBottom: 1.5, width: `${w}%` }} />)}
          </div>
        ))}
      </div>
    );
  }

  if (preview === 'minimalist') {
    return (
      <div style={{ width: 110, height: 148, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', padding: '12px 10px', flexShrink: 0 }}>
        <div style={{ height: 8, width: 70, background: '#111827', borderRadius: 1, marginBottom: 3 }} />
        <div style={{ height: 2, width: 44, background: '#D1D5DB', borderRadius: 1, marginBottom: 4 }} />
        <div style={{ height: 1, background: '#111827', marginBottom: 3 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[16, 18, 14].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', width: w }} />)}
        </div>
        <div style={{ height: 8 }} />
        {[0, 1, 2].map((s) => (
          <div key={s} style={{ display: 'flex', gap: 6, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ width: 18, flexShrink: 0 }}>
              <div style={{ height: 2, background: '#E5E7EB', borderRadius: 1, width: 14 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 3, background: '#374151', borderRadius: 1, width: '65%', marginBottom: 2 }} />
              {[75, 55, 80].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', marginBottom: 1.5, width: `${w}%` }} />)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // creative
  return (
    <div style={{ width: 110, height: 148, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', flexShrink: 0 }}>
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', padding: '7px 8px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ width: 50, height: 5, borderRadius: 2, background: '#fff', marginBottom: 3 }} />
            <div style={{ height: 2.5, width: 36, borderRadius: 1, background: 'linear-gradient(90deg, #A78BFA, #67E8F9)' }} />
          </div>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }} />
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {[22, 16, 20].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.3)', width: w }} />)}
        </div>
      </div>
      <div style={{ height: 2, background: 'linear-gradient(90deg, #7C3AED, #4F46E5, #0D9488)' }} />
      <div style={{ display: 'flex', flex: 1, height: 'calc(100% - 37px)' }}>
        <div style={{ flex: 1, padding: '5px 6px' }}>
          <div style={{ display: 'flex', gap: 5, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 1, background: '#4F46E5', flexShrink: 0, marginTop: 0.5 }} />
            <div style={{ height: 2, background: '#4F46E5', borderRadius: 1, width: '55%', marginTop: 2 }} />
          </div>
          {[55, 75, 45, 65].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', marginBottom: 2, width: `${w}%` }} />)}
          <div style={{ display: 'flex', gap: 5, margin: '5px 0 3px' }}>
            <div style={{ width: 6, height: 6, borderRadius: 1, background: '#7C3AED', flexShrink: 0, marginTop: 0.5 }} />
            <div style={{ height: 2, background: '#7C3AED', borderRadius: 1, width: '45%', marginTop: 2 }} />
          </div>
          <div style={{ paddingLeft: 8, borderLeft: '2px solid #7C3AED' }}>
            {[55, 70, 45, 60].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#E5E7EB', marginBottom: 2, width: `${w}%` }} />)}
          </div>
        </div>
        <div style={{ width: 30, background: '#FAFAFA', borderLeft: '1px solid #F1F5F9', padding: '5px 4px' }}>
          {[16, 18, 13].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: '#D1D5DB', marginBottom: 2.5, width: w }} />)}
          <div style={{ height: 1, background: '#E5E7EB', margin: '3px 0' }} />
          {[14, 16, 12, 15].map((w, i) => <div key={i} style={{ height: 2.5, borderRadius: 99, background: '#EEF2FF', border: '1px solid #C7D2FE', marginBottom: 2, width: w }} />)}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('modern');
  const [creating, setCreating] = useState(false);

  const handleUse = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const resume = await resumeService.create({
        title: `My ${TEMPLATES.find((t) => t.id === selected)?.name} Resume`,
        templateId: selected,
      });
      navigate(`/editor/${resume.id}`);
    } catch {
      toast.error('Failed to create resume.');
    } finally {
      setCreating(false);
    }
  };

  const selectedTemplate = TEMPLATES.find((t) => t.id === selected);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 80, background: '#0C0420', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div style={{ position: 'fixed', top: '10%', right: '-8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(211,145,176,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '15%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '7px 16px',
            background: 'rgba(211,145,176,0.08)',
            border: '1px solid rgba(211,145,176,0.2)',
            borderRadius: 99, fontSize: 12, color: 'rgba(243,234,245,0.65)', fontWeight: 500, marginBottom: 22,
          }}>
            <Sparkles size={12} color="#D391B0" /> 4 Premium Resume Templates
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#F3EAF5', letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 14 }}>
            Choose Your <span className="gradient-text">Template</span>
          </h1>
          <p style={{ color: 'rgba(243,234,245,0.4)', fontSize: 15, maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Every template is ATS-optimized and professionally crafted.<br />
            You can switch between them anytime inside the editor.
          </p>
        </div>

        {/* ── Template Grid ──────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
          {TEMPLATES.map((t, i) => {
            const isSelected = selected === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: isSelected ? 'rgba(12,4,32,0.9)' : 'rgba(12,4,32,0.6)',
                  outline: isSelected ? `2px solid ${t.accent}` : '2px solid rgba(255,255,255,0.06)',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: isSelected
                    ? `0 0 0 4px ${t.accent}22, 0 24px 60px ${t.accent}30`
                    : '0 2px 16px rgba(0,0,0,0.4)',
                  transform: isSelected ? 'scale(1.025)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Preview area */}
                <div
                  style={{
                    height: 210,
                    background: `linear-gradient(160deg, rgba(15,15,30,0.95) 0%, rgba(20,10,40,0.98) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Ambient glow behind preview */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(ellipse at center, ${t.accent}18 0%, transparent 65%)`,
                    }}
                  />
                  <TemplatePreview template={t} isSelected={isSelected} />

                  {/* Selected checkmark badge */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: t.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 16px ${t.accent}60`,
                      }}
                    >
                      <Check size={13} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Info area */}
                <div style={{ padding: '16px 20px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: t.accent,
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${t.accent}80`,
                      }}
                    />
                    <span style={{ fontWeight: 800, color: '#F3EAF5', fontSize: 15, letterSpacing: '-0.3px' }}>{t.name}</span>
                  </div>
                  <p style={{ color: 'rgba(243,234,245,0.42)', fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>{t.desc}</p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: 99,
                          background: `${t.accent}18`,
                          color: t.accent,
                          border: `1px solid ${t.accent}30`,
                          letterSpacing: '0.3px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="animate-fade-in-up delay-500" style={{ textAlign: 'center' }}>
          <button
            onClick={handleUse}
            disabled={creating}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '15px 40px',
              borderRadius: 14,
              fontSize: 16,
              cursor: creating ? 'not-allowed' : 'pointer',
              opacity: creating ? 0.7 : 1,
              letterSpacing: '-0.2px',
            }}
          >
            {creating ? (
              <span className="spinner" style={{ width: 20, height: 20 }} />
            ) : (
              <>
                <Zap size={17} fill="currentColor" />
                Use {selectedTemplate?.name} Template
                <ArrowRight size={16} />
              </>
            )}
          </button>
          <p style={{ color: 'rgba(243,234,245,0.28)', fontSize: 12, marginTop: 12 }}>
            Switch templates anytime · No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}
