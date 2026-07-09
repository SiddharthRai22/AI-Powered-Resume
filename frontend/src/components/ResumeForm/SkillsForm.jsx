import { useState } from 'react';
import { Plus, X, Sparkles, Code, Award, Globe } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import toast from 'react-hot-toast';

export default function SkillsForm() {
  const { resumeData, updateField } = useResume();
  const { skills, certifications = [], languages = [] } = resumeData;
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [improving, setImproving] = useState(false);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      updateField('skills', [...skills, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (s) => updateField('skills', skills.filter((sk) => sk !== s));

  const handleKeyDown = (e, fn) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); fn(); }
  };

  const addItem = (arr, setArr, input, setInput) => {
    const trimmed = input.trim();
    if (trimmed) { updateField(arr, [...resumeData[arr], trimmed]); }
    setInput('');
  };

  const removeItem = (arr, item) =>
    updateField(arr, resumeData[arr].filter((i) => i !== item));

  const handleAIImprove = async () => {
    if (!skills.length) return toast.error('Add some skills first.');
    setImproving(true);
    try {
      const context = resumeData.personalInfo?.headline || '';
      const result = await aiService.improve(skills.join(', '), 'skills', context);
      const improved = result.improvedText.split(',').map((s) => s.trim()).filter(Boolean);
      updateField('skills', improved);
      toast.success('Skills optimized by AI!');
    } catch (err) {
      const msg = err.response?.data?.message || 'AI unavailable — check your API key.';
      toast.error(msg);
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills */}
      <div className="form-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
              <Code size={18} />
            </div>
            <div>
              <h3 className="text-white font-display font-bold text-base tracking-tight">Skills</h3>
              <p className="text-white/40 text-xs mt-0.5">Type a skill and press Enter or comma.</p>
            </div>
          </div>
          <button
            onClick={handleAIImprove}
            disabled={improving}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(192, 132, 252, 0.12) 100%)',
              border: '1px solid rgba(167, 139, 250, 0.35)',
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-purple-300 rounded-lg hover:text-purple-200 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Sparkles size={12} className={improving ? 'animate-spin' : ''} />
            {improving ? 'Optimizing…' : 'AI Optimize'}
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Tag display */}
          <div className="flex flex-wrap gap-2 min-h-[36px]">
            {skills.length === 0 && (
              <p className="text-white/20 text-xs italic self-center">No skills added yet. Type below and press Enter.</p>
            )}
            {skills.map((skill) => (
              <span key={skill} style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }} className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#a5b4fc] rounded-full hover:border-[#818cf8]/50 transition-colors shadow-sm">
                {skill}
                <button onClick={() => removeSkill(skill)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer ml-0.5">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Code size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                placeholder="e.g. React, Node.js, Python…"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addSkill)}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            <button onClick={addSkill} className="px-4 py-3 btn-primary text-white text-sm rounded-xl relative overflow-hidden cursor-pointer flex items-center justify-center border-none">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="form-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
            <Award size={18} />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-base tracking-tight">Certifications</h3>
            <p className="text-white/40 text-xs mt-0.5">Add professional credentials and awards.</p>
          </div>
        </div>
        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[36px]">
            {certifications.length === 0 && (
              <p className="text-white/20 text-xs italic self-center">No certifications yet. Type below and press Enter.</p>
            )}
            {certifications.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-white/80 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/20 transition-colors">
                {c}
                <button onClick={() => removeItem('certifications', c)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer ml-0.5">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Award size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                placeholder="AWS Certified Developer…"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => addItem('certifications', null, certInput, setCertInput))}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            <button onClick={() => addItem('certifications', null, certInput, setCertInput)} className="px-4 py-3 text-white/70 text-sm rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex items-center justify-center">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="form-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-base tracking-tight">Languages</h3>
            <p className="text-white/40 text-xs mt-0.5">Languages you can speak and communicate in.</p>
          </div>
        </div>
        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[36px]">
            {languages.length === 0 && (
              <p className="text-white/20 text-xs italic self-center">No languages yet. Type below and press Enter.</p>
            )}
            {languages.map((l, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-white/80 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/20 transition-colors">
                {l}
                <button onClick={() => removeItem('languages', l)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer ml-0.5">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                placeholder="English (Native)…"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => addItem('languages', null, langInput, setLangInput))}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            <button onClick={() => addItem('languages', null, langInput, setLangInput)} className="px-4 py-3 text-white/70 text-sm rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex items-center justify-center">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
