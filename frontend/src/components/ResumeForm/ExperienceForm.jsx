import { useState } from 'react';
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-base">Work Experience</h3>
          <p className="text-white/45 text-xs mt-0.5">Add your work history, most recent first.</p>
        </div>
        <button
          onClick={() => addArrayItem('experience', { ...EMPTY_EXP, highlights: [''] })}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] rounded-lg hover:bg-[rgba(99,102,241,0.2)] hover:border-[rgba(99,102,241,0.4)] hover:text-white transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus size={13} /> Add
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={idx} className="form-card rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/[0.04] bg-white/[0.01]">
              <button onClick={() => toggleCollapse(idx)} className="flex-1 flex items-center justify-between text-left cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-white/90 tracking-wide">{exp.role || `Experience ${idx + 1}`}</p>
                  {exp.company && <p className="text-xs text-white/45 mt-0.5 font-medium">{exp.company}</p>}
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
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Job Title</label>
                    <input className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" placeholder="Software Engineer"
                      value={exp.role} onChange={(e) => updateArrayItem('experience', idx, 'role', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Company</label>
                    <input className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" placeholder="Google"
                      value={exp.company} onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Duration</label>
                    <input className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" placeholder="Jan 2022 - Present"
                      value={exp.duration} onChange={(e) => updateArrayItem('experience', idx, 'duration', e.target.value)} />
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-white/70 font-semibold tracking-wide">Key Highlights / Bullets</label>
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
                        <input
                          className="input-dark flex-1 px-3.5 py-2.5 rounded-xl text-xs"
                          placeholder="Increased revenue by 30% through..."
                          value={h}
                          onChange={(e) => updateHighlight(idx, hIdx, e.target.value)}
                        />
                        <button onClick={() => removeHighlight(idx, hIdx)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addHighlight(idx)} className="flex items-center gap-1 text-xs font-medium text-[#818cf8] hover:text-[#a5b4fc] transition-colors mt-2 cursor-pointer">
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
