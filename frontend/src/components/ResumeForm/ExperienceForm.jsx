import { useState } from 'react';
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp, Briefcase, Building, Calendar, List } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import toast from 'react-hot-toast';

const EMPTY_EXP = { company: '', role: '', duration: '', highlights: [''] };

export default function ExperienceForm() {
  const { resumeData, updateArrayItem, addArrayItem, removeArrayItem, updateField } = useResume();
  const { experience } = resumeData;
  const [collapsed, setCollapsed] = useState([]);
  const [improving, setImproving] = useState(null); // index of exp being improved

  const toggleCollapse = (idx) =>
    setCollapsed((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);

  const updateHighlight = (expIdx, hIdx, value) => {
    const updated = [...experience];
    updated[expIdx] = {
      ...updated[expIdx],
      highlights: updated[expIdx].highlights.map((h, i) => (i === hIdx ? value : h)),
    };
    updateField('experience', updated);
  };

  const addHighlight = (expIdx) => {
    const updated = [...experience];
    updated[expIdx] = { ...updated[expIdx], highlights: [...updated[expIdx].highlights, ''] };
    updateField('experience', updated);
  };

  const removeHighlight = (expIdx, hIdx) => {
    const updated = [...experience];
    updated[expIdx] = {
      ...updated[expIdx],
      highlights: updated[expIdx].highlights.filter((_, i) => i !== hIdx),
    };
    updateField('experience', updated);
  };

  const handleAIImprove = async (idx) => {
    const exp = experience[idx];
    const text = exp.highlights.filter(Boolean).join('\n');
    if (!text.trim()) return toast.error('Add some bullet points first.');
    setImproving(idx);
    try {
      const context = `${exp.role} at ${exp.company}`;
      const result = await aiService.improve(text, 'bullets', context);
      const improved = result.improvedText.split('\n').map((l) => l.replace(/^[•▸→\-\*]\s*/, '').trim()).filter(Boolean);
      const updated = [...experience];
      updated[idx] = { ...updated[idx], highlights: improved };
      updateField('experience', updated);
      toast.success('Experience bullets improved!');
    } catch (err) {
      const msg = err.response?.data?.message || 'AI unavailable — check your API key.';
      toast.error(msg);
    } finally {
      setImproving(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
            <Briefcase size={18} />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-lg tracking-tight">Work Experience</h3>
            <p className="text-white/40 text-xs mt-0.5">Add your work history, most recent first.</p>
          </div>
        </div>
        <button
          onClick={() => addArrayItem('experience', { ...EMPTY_EXP, highlights: [''] })}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-500/80 to-purple-600/80 hover:from-brand-500 hover:to-purple-600 border border-brand-400/30 hover:border-brand-400/50 rounded-lg transition-all cursor-pointer shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transform hover:-translate-y-0.5"
        >
          <Plus size={13} /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={idx} className="form-card rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.04] bg-white/[0.02]">
              <button onClick={() => toggleCollapse(idx)} className="flex-1 flex items-center justify-between text-left cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Briefcase size={14} className="text-brand-400/70" />
                  <div>
                    <p className="text-sm font-semibold text-white/90 tracking-wide">{exp.role || `Experience ${idx + 1}`}</p>
                    {exp.company && <p className="text-xs text-white/45 mt-0.5 font-medium">{exp.company}</p>}
                  </div>
                </div>
                {collapsed.includes(idx) ? <ChevronDown size={16} className="text-white/40" /> : <ChevronUp size={16} className="text-white/40" />}
              </button>
              <button onClick={() => removeArrayItem('experience', idx)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>

            {/* Fields */}
            {!collapsed.includes(idx) && (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-white/45 tracking-wider uppercase">Job Title</label>
                    <div className="relative">
                      <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                      <input className="input-dark w-full pr-3.5 py-3 rounded-xl text-sm" placeholder="Software Engineer"
                        value={exp.role} onChange={(e) => updateArrayItem('experience', idx, 'role', e.target.value)}
                        style={{ paddingLeft: '38px' }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-white/45 tracking-wider uppercase">Company</label>
                    <div className="relative">
                      <Building size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                      <input className="input-dark w-full pr-3.5 py-3 rounded-xl text-sm" placeholder="Google"
                        value={exp.company} onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)}
                        style={{ paddingLeft: '38px' }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-white/45 tracking-wider uppercase">Duration</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                      <input className="input-dark w-full pr-3.5 py-3 rounded-xl text-sm" placeholder="Jan 2022 - Present"
                        value={exp.duration} onChange={(e) => updateArrayItem('experience', idx, 'duration', e.target.value)}
                        style={{ paddingLeft: '38px' }} />
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-[11px] font-semibold text-white/50 tracking-wider uppercase">Key Highlights / Bullets</label>
                    <button
                      onClick={() => handleAIImprove(idx)}
                      disabled={improving === idx}
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(192, 132, 252, 0.12) 100%)',
                        border: '1px solid rgba(167, 139, 250, 0.35)',
                        boxShadow: '0 0 8px rgba(167, 139, 250, 0.05)',
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-purple-300 rounded-lg hover:text-purple-200 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles size={11} className={improving === idx ? 'animate-spin' : ''} />
                      {improving === idx ? 'Improving…' : 'AI Improve'}
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {exp.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex gap-2 items-center">
                        <div className="relative flex-1">
                          <List size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400/50" />
                          <input
                            className="input-dark w-full pr-3.5 py-2.5 rounded-xl text-xs"
                            placeholder="Increased revenue by 30% through..."
                            value={h}
                            onChange={(e) => updateHighlight(idx, hIdx, e.target.value)}
                            style={{ paddingLeft: '34px' }}
                          />
                        </div>
                        <button onClick={() => removeHighlight(idx, hIdx)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addHighlight(idx)} className="flex items-center gap-1.5 text-xs font-semibold text-[#818cf8] hover:text-[#a5b4fc] transition-colors mt-2 cursor-pointer">
                      <Plus size={13} /> Add bullet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
