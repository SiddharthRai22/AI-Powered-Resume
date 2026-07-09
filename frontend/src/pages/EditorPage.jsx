import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Save, Download, Sparkles, Eye, EyeOff, ChevronLeft,
  User, Briefcase, GraduationCap, Code, FolderGit2,
  BarChart2, Loader2, Wand2, X, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useResume } from '../context/ResumeContext';
import { resumeService } from '../services/resumeService';
import { aiService } from '../services/aiService';
import ResumePreview from '../components/ResumePreview/ResumePreview';
import PersonalInfoForm from '../components/ResumeForm/PersonalInfoForm';
import ExperienceForm from '../components/ResumeForm/ExperienceForm';
import EducationForm from '../components/ResumeForm/EducationForm';
import SkillsForm from '../components/ResumeForm/SkillsForm';
import ProjectsForm from '../components/ResumeForm/ProjectsForm';

const TABS = [
  { id: 'personal',   label: 'Personal',   icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education',  label: 'Education',  icon: GraduationCap },
  { id: 'skills',     label: 'Skills',     icon: Code },
  { id: 'projects',   label: 'Projects',   icon: FolderGit2 },
];

const TEMPLATE_OPTIONS = [
  { id: 'modern',     label: 'Modern',     color: '#6366f1' },
  { id: 'classic',    label: 'Classic',    color: '#10b981' },
  { id: 'minimalist', label: 'Minimalist', color: '#f59e0b' },
  { id: 'creative',   label: 'Creative',   color: '#a78bfa' },
];

export default function EditorPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { resumeData, activeTemplate, activeTab, setActiveTemplate, setActiveTab, updateField, loadResume, resetResume } = useResume();

  const [resumeId, setResumeId]       = useState(id !== 'new' ? id : null);
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [saving, setSaving]           = useState(false);
  const [loading, setLoading]         = useState(id !== 'new');
  const [showPreview, setShowPreview] = useState(true);
  const [showAts, setShowAts]         = useState(false);
  const [atsData, setAtsData]         = useState(null);
  const [atsLoading, setAtsLoading]   = useState(false);
  const [jobDesc, setJobDesc]         = useState('');
  const [showGenModal, setShowGenModal] = useState(false);
  const [genJobDesc, setGenJobDesc]   = useState('');
  const [generating, setGenerating]   = useState(false);
  const saveRef = useRef(null);

  // Load resume
  useEffect(() => {
    if (id === 'new') {
      resetResume();
      const tmpl = searchParams.get('template') || 'modern';
      setActiveTemplate(tmpl);
      setLoading(false);
      return;
    }
    resumeService.getById(id).then(r => {
      setResumeTitle(r.title);
      setResumeId(r.id);
      loadResume({ ...r.content, templateId: r.templateId });
    }).catch(() => {
      toast.error('Resume not found.');
      navigate('/dashboard');
    }).finally(() => setLoading(false));
  }, [id]);

  // Auto-save debounce
  const autoSave = useCallback(() => {
    if (!resumeId) return;
    clearTimeout(saveRef.current);
    saveRef.current = setTimeout(async () => {
      try {
        await resumeService.update(resumeId, { title: resumeTitle, templateId: activeTemplate, content: { ...resumeData, templateId: activeTemplate } });
      } catch { /* silent */ }
    }, 2500);
  }, [resumeId, resumeData, resumeTitle, activeTemplate]);

  useEffect(() => { autoSave(); return () => clearTimeout(saveRef.current); }, [resumeData, activeTemplate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (resumeId) {
        await resumeService.update(resumeId, { title: resumeTitle, templateId: activeTemplate, content: { ...resumeData, templateId: activeTemplate } });
      } else {
        const r = await resumeService.create({ title: resumeTitle, templateId: activeTemplate, content: { ...resumeData, templateId: activeTemplate } });
        setResumeId(r.id);
        navigate(`/editor/${r.id}`, { replace: true });
      }
      toast.success('Saved!');
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDownloadPDF = async () => {
    const tid = toast.loading('Generating PDF…');
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      const el = document.getElementById('print-area');
      if (!el) return;
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 210, 297);
      pdf.save(`${resumeTitle.replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF downloaded!', { id: tid });
    } catch { toast.error('PDF failed.', { id: tid }); }
  };

  const handleAIGenerate = async () => {
    if (!genJobDesc.trim()) return toast.error('Enter a job description first.');
    setGenerating(true);
    try {
      const r = await aiService.generate(genJobDesc, { fullName: resumeData.personalInfo?.fullName, email: resumeData.personalInfo?.email });
      loadResume({ ...r, templateId: activeTemplate });
      setShowGenModal(false);
      setGenJobDesc('');
      toast.success('Resume generated by AI!');
    } catch (err) {
      const msg = err.response?.data?.message || 'AI generation failed. Check your API key.';
      toast.error(msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleImproveSummary = async () => {
    if (!resumeData.summary.trim()) return toast.error('Write a summary first.');
    const tid = toast.loading('Improving…');
    try {
      const r = await aiService.improve(resumeData.summary, 'summary', resumeData.personalInfo?.headline);
      updateField('summary', r.improvedText);
      toast.success('Summary improved!', { id: tid });
    } catch (err) {
      const msg = err.response?.data?.message || 'AI unavailable.';
      toast.error(msg, { id: tid });
    }
  };

  const handleAtsCheck = async () => {
    setAtsLoading(true);
    try {
      const r = await aiService.atsCheck({ ...resumeData, templateId: activeTemplate }, jobDesc);
      setAtsData(r);
    } catch (err) {
      const msg = err.response?.data?.message || 'ATS check failed.';
      toast.error(msg);
    } finally {
      setAtsLoading(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0d1a' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div className="spinner" style={{ width: 36, height: 36 }} />
        <p style={{ color: 'rgba(241,245,249,0.4)', fontSize: 14 }}>Loading resume…</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0b0d1a', paddingTop: 64 }}>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div style={{ background: 'rgba(11,13,26,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', backdropFilter: 'blur(12px)', position: 'sticky', top: 64, zIndex: 40 }}>

        {/* Back */}
        <button onClick={() => navigate('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(241,245,249,0.45)', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 8px', borderRadius: 8, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(241,245,249,0.45)'}>
          <ChevronLeft size={15} /> Dashboard
        </button>

        <div style={{ height: 18, width: 1, background: 'rgba(255,255,255,0.1)' }} />

        {/* Title */}
        <input value={resumeTitle} onChange={e => setResumeTitle(e.target.value)} className="input-field"
          style={{ padding: '6px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, width: 180 }} />

        {/* Template Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' }}>
          {TEMPLATE_OPTIONS.map(t => (
            <button key={t.id} onClick={() => setActiveTemplate(t.id)}
              style={{
                padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: activeTemplate === t.id ? `${t.color}22` : 'rgba(255,255,255,0.04)',
                color: activeTemplate === t.id ? t.color : 'rgba(241,245,249,0.4)',
                outline: activeTemplate === t.id ? `1px solid ${t.color}44` : '1px solid rgba(255,255,255,0.08)',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ height: 18, width: 1, background: 'rgba(255,255,255,0.1)' }} />

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setShowGenModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, fontSize: 12, fontWeight: 600, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#c084fc', cursor: 'pointer' }}>
            <Wand2 size={13} /> AI Generate
          </button>

          <button onClick={() => setShowAts(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, fontSize: 12, fontWeight: 600, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399', cursor: 'pointer' }}>
            <BarChart2 size={13} /> ATS Score
          </button>

          <button onClick={() => setShowPreview(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, fontSize: 12, fontWeight: 500, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(241,245,249,0.6)', cursor: 'pointer' }}>
            {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
            {showPreview ? 'Hide' : 'Show'}
          </button>

          <button onClick={handleDownloadPDF}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, fontSize: 12, fontWeight: 500, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(241,245,249,0.7)', cursor: 'pointer' }}>
            <Download size={13} /> PDF
          </button>

          <button onClick={handleSave} disabled={saving} className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 16px', borderRadius: 9, fontSize: 12, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, border: 'none' }}>
            {saving ? <span className="spinner" style={{ width: 14, height: 14 }} /> : <><Save size={13} /> Save</>}
          </button>
        </div>
      </div>

      {/* ── ATS Panel ────────────────────────────────────────────────────── */}
      {showAts && (
        <div className="animate-fade-in" style={{ background: 'rgba(11,13,26,0.9)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '16px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ display: 'block', fontSize: 11, color: 'rgba(241,245,249,0.4)', marginBottom: 6 }}>Job Description (optional)</label>
              <textarea rows={2} className="input-field" placeholder="Paste job description to match keywords…" value={jobDesc} onChange={e => setJobDesc(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 10, fontSize: 12, resize: 'none' }} />
            </div>
            <button onClick={handleAtsCheck} disabled={atsLoading} className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13, cursor: atsLoading ? 'not-allowed' : 'pointer', opacity: atsLoading ? 0.7 : 1, border: 'none', flexShrink: 0 }}>
              {atsLoading ? <span className="spinner" style={{ width: 15, height: 15 }} /> : <><BarChart2 size={14} /> Analyze</>}
            </button>
          </div>
          {atsData && (
            <div style={{ maxWidth: 1100, margin: '14px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              <AtsCard label="ATS Score" value={`${atsData.atsScore}%`} color={atsData.atsScore >= 70 ? '#4ade80' : atsData.atsScore >= 50 ? '#fbbf24' : '#f87171'} />
              <AtsCard label="Keyword Match" value={`${atsData.keywordMatchPercentage ?? 0}%`} color="#818cf8" />
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px', gridColumn: 'span 2' }}>
                <p style={{ fontSize: 11, color: 'rgba(241,245,249,0.4)', marginBottom: 8 }}>Improvements</p>
                {(atsData.improvements || []).slice(0, 3).map((imp, i) => (
                  <p key={i} style={{ fontSize: 12, color: 'rgba(241,245,249,0.65)', marginBottom: 4 }}>→ {imp}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Main Split Layout ─────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Form Panel */}
        <div style={{ width: showPreview ? 450 : '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto', minWidth: showPreview ? 360 : 'auto', background: '#0e101f' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', padding: '12px 12px 0', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,13,26,0.6)', overflowX: 'auto', flexShrink: 0 }}>
            {TABS.map(({ id: tid, label, icon: Icon }) => (
              <button key={tid} onClick={() => setActiveTab(tid)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: '10px 10px 0 0',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                  background: activeTab === tid ? 'rgba(99,102,241,0.12)' : 'transparent',
                  color: activeTab === tid ? '#818cf8' : 'rgba(241,245,249,0.4)',
                  borderBottom: activeTab === tid ? '2px solid #6366f1' : '2px solid transparent',
                  border: 'none', outline: 'none', transition: 'all 0.2s',
                }}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
            <div style={{ maxWidth: showPreview ? '100%' : 720, margin: '0 auto', width: '100%' }}>
              {activeTab === 'personal' && (
                <>
                  <PersonalInfoForm />
                  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)', margin: '24px 0' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>Professional Summary</h3>
                        <p style={{ fontSize: 11, color: 'rgba(241,245,249,0.35)', marginTop: 2 }}>A compelling 2–3 sentence overview</p>
                      </div>
                      <button onClick={handleImproveSummary}
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(192, 132, 252, 0.12) 100%)',
                          border: '1px solid rgba(167, 139, 250, 0.35)',
                          boxShadow: '0 0 8px rgba(167, 139, 250, 0.05)',
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-purple-300 rounded-lg hover:text-purple-200 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all cursor-pointer">
                        <Sparkles size={11} /> AI Improve
                      </button>
                    </div>
                    <textarea rows={4} className="input-field"
                      placeholder="Experienced software engineer with 3+ years building scalable web applications…"
                      value={resumeData.summary} onChange={e => updateField('summary', e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 14, fontSize: 13, resize: 'none', lineHeight: 1.6 }} />
                  </div>
                </>
              )}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'education'  && <EducationForm />}
              {activeTab === 'skills'     && <SkillsForm />}
              {activeTab === 'projects'   && <ProjectsForm />}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div id="editor-preview" style={{ flex: 1, overflow: 'auto', background: '#080a14', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', minWidth: 0 }}>
            <div style={{ width: '100%', maxWidth: 680 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: 'rgba(241,245,249,0.25)', letterSpacing: '0.5px' }}>LIVE PREVIEW</p>
                <p style={{ fontSize: 11, color: 'rgba(241,245,249,0.2)' }}>
                  {TEMPLATE_OPTIONS.find(t => t.id === activeTemplate)?.label} Template
                </p>
              </div>
              {/* Fluid scaling: the container is the "viewport" for the 794px-wide A4 page */}
              <ScaledPreview data={resumeData} templateId={activeTemplate} />
            </div>
          </div>
        )}

        {/* Hidden full-scale print area */}
        <div id="print-area" style={{ position: 'fixed', left: '-9999px', top: 0, width: 794, pointerEvents: 'none', zIndex: -1 }}>
          <ResumePreview data={resumeData} templateId={activeTemplate} scale={1} />
        </div>
      </div>

      {/* ── AI Generate Modal ────────────────────────────────────────────── */}
      {showGenModal && (
        <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="animate-fade-in-up" style={{ background: '#0f1123', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 24, padding: 32, width: '100%', maxWidth: 520, boxShadow: '0 32px 100px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="btn-primary" style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wand2 size={16} color="#fff" />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9' }}>AI Resume Generator</h2>
              </div>
              <button onClick={() => setShowGenModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(241,245,249,0.35)', padding: 4, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(241,245,249,0.35)'}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: 'rgba(241,245,249,0.45)', marginBottom: 18, lineHeight: 1.6 }}>
              Paste a job description and Gemini AI will generate a complete, tailored resume for you.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(241,245,249,0.5)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Job Description *</label>
              <textarea rows={6} className="input-field"
                placeholder="We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and AWS…"
                value={genJobDesc} onChange={e => setGenJobDesc(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 13, resize: 'none', lineHeight: 1.6 }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowGenModal(false)}
                style={{ flex: 1, padding: '11px', borderRadius: 12, fontSize: 14, fontWeight: 500, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(241,245,249,0.6)', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleAIGenerate} disabled={generating || !genJobDesc.trim()} className="btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', borderRadius: 12, fontSize: 14, cursor: generating ? 'not-allowed' : 'pointer', opacity: generating || !genJobDesc.trim() ? 0.6 : 1, border: 'none' }}>
                {generating ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Generating…</> : <><Sparkles size={15} /> Generate</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          #editor-preview { display: none; }
        }
        @media (max-width: 640px) {
          #editor-form { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

function AtsCard({ label, value, color }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
      <p style={{ fontSize: 11, color: 'rgba(241,245,249,0.35)', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 900, color }}>{value}</p>
    </div>
  );
}

/**
 * ScaledPreview: renders the full 794px A4 template scaled to fit
 * the available container width via ResizeObserver.
 */
function ScaledPreview({ data, templateId }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.8);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      const w = containerRef.current?.offsetWidth || 680;
      setScale(Math.min(1, w / 794));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      {/* Container that clips to the scaled height */}
      <div style={{
        width: '100%',
        height: Math.round(1056 * scale),
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        position: 'relative',
      }}>
        <div style={{
          width: 794,
          minHeight: 1056,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          background: '#fff',
        }}>
          <ResumePreview data={data} templateId={templateId} scale={1} />
        </div>
      </div>
    </div>
  );
}

