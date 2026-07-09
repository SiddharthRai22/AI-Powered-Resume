import { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
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
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-white font-semibold text-base">Skills</h3>
            <p className="text-white/45 text-xs mt-0.5">Type a skill and press Enter or comma.</p>
          </div>
          <button
            onClick={handleAIImprove}
            disabled={improving}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(192, 132, 252, 0.12) 100%)',
              border: '1px solid rgba(167, 139, 250, 0.35)',
              boxShadow: '0 0 8px rgba(167, 139, 250, 0.05)',
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-purple-300 rounded-lg hover:text-purple-200 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Sparkles size={12} className={improving ? 'animate-spin' : ''} />
            {improving ? 'Optimizing…' : 'AI Optimize'}
          </button>
        </div>

        {/* Tag display */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[36px]">
          {skills.map((skill) => (
            <span key={skill} style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#a5b4fc] rounded-full">
              {skill}
              <button onClick={() => removeSkill(skill)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="input-dark flex-1 px-3.5 py-2.5 rounded-xl text-sm"
            placeholder="e.g. React, Node.js, Python…"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, addSkill)}
          />
          <button onClick={addSkill} className="px-4 py-2.5 btn-gradient text-white text-sm rounded-xl relative overflow-hidden cursor-pointer flex items-center justify-center">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-2.5 tracking-wide">Certifications</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {certifications.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 bg-white/[0.04] border border-white/10 rounded-full">
              {c}
              <button onClick={() => removeItem('certifications', c)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="input-dark flex-1 px-3.5 py-2.5 rounded-xl text-sm"
            placeholder="AWS Certified Developer…"
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, () => addItem('certifications', null, certInput, setCertInput))}
          />
          <button onClick={() => addItem('certifications', null, certInput, setCertInput)} className="px-4 py-2.5 text-white/70 text-sm rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-2.5 tracking-wide">Languages</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {languages.map((l, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 bg-white/[0.04] border border-white/10 rounded-full">
              {l}
              <button onClick={() => removeItem('languages', l)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="input-dark flex-1 px-3.5 py-2.5 rounded-xl text-sm"
            placeholder="English (Native)…"
            value={langInput}
            onChange={(e) => setLangInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, () => addItem('languages', null, langInput, setLangInput))}
          />
          <button onClick={() => addItem('languages', null, langInput, setLangInput)} className="px-4 py-2.5 text-white/70 text-sm rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
