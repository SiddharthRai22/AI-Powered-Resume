import { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import toast from 'react-hot-toast';

const EMPTY_PROJECT = { name: '', description: '', link: '' };

export default function ProjectsForm() {
  const { resumeData, updateArrayItem, addArrayItem, removeArrayItem, updateField } = useResume();
  const { projects } = resumeData;
  const [improving, setImproving] = useState(null);

  const handleAIImprove = async (idx) => {
    const proj = projects[idx];
    if (!proj.description.trim()) return toast.error('Add a description first.');
    setImproving(idx);
    try {
      const result = await aiService.improve(proj.description, 'general', `Project: ${proj.name}`);
      const updated = [...projects];
      updated[idx] = { ...updated[idx], description: result.improvedText };
      updateField('projects', updated);
      toast.success('Project description improved!');
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
          <h3 className="text-white font-semibold text-base">Projects</h3>
          <p className="text-white/45 text-xs mt-0.5">Showcase your best work.</p>
        </div>
        <button
          onClick={() => addArrayItem('projects', { ...EMPTY_PROJECT })}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] rounded-lg hover:bg-[rgba(99,102,241,0.2)] hover:border-[rgba(99,102,241,0.4)] hover:text-white transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus size={13} /> Add
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={idx} className="form-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.04]">
              <p className="text-sm font-semibold text-white/90 tracking-wide">{proj.name || `Project ${idx + 1}`}</p>
              <button
                onClick={() => removeArrayItem('projects', idx)}
                className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Project Name</label>
                  <input
                    className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm"
                    placeholder="AI Resume Builder"
                    value={proj.name}
                    onChange={(e) => updateArrayItem('projects', idx, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">GitHub / Live Link</label>
                  <input
                    className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm"
                    placeholder="github.com/username/project"
                    value={proj.link}
                    onChange={(e) => updateArrayItem('projects', idx, 'link', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-white/70 font-semibold tracking-wide">Description</label>
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
                <textarea
                  className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm resize-none"
                  rows={3}
                  placeholder="Built a full-stack web app using React and Node.js that reduces resume creation time by 80%..."
                  value={proj.description}
                  onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
