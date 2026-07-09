import { useState } from 'react';
import { Plus, Trash2, Sparkles, FolderGit2, Link2, FileText } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
            <FolderGit2 size={18} />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-lg tracking-tight">Projects</h3>
            <p className="text-white/40 text-xs mt-0.5">Showcase your best personal and professional work.</p>
          </div>
        </div>
        <button
          onClick={() => addArrayItem('projects', { ...EMPTY_PROJECT })}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-500/80 to-purple-600/80 hover:from-brand-500 hover:to-purple-600 border border-brand-400/30 hover:border-brand-400/50 rounded-lg transition-all cursor-pointer shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transform hover:-translate-y-0.5"
        >
          <Plus size={13} /> Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={idx} className="form-card rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <FolderGit2 size={14} className="text-brand-400/70" />
                <p className="text-sm font-semibold text-white/90 tracking-wide">{proj.name || `Project ${idx + 1}`}</p>
              </div>
              <button
                onClick={() => removeArrayItem('projects', idx)}
                className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-5">
              {/* Project Name + Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/45 tracking-widest uppercase">Project Name</label>
                  <div className="relative">
                    <FolderGit2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                      placeholder="AI Resume Builder"
                      value={proj.name}
                      onChange={(e) => updateArrayItem('projects', idx, 'name', e.target.value)}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/45 tracking-widest uppercase">GitHub / Live Link</label>
                  <div className="relative">
                    <Link2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                      placeholder="github.com/username/project"
                      value={proj.link}
                      onChange={(e) => updateArrayItem('projects', idx, 'link', e.target.value)}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-white/45 tracking-widest uppercase">Description</label>
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
                <div className="relative">
                  <FileText size={14} className="absolute left-3.5 top-3.5 text-white/30" />
                  <textarea
                    className="input-dark w-full pr-4 py-3 rounded-xl text-sm resize-none"
                    rows={4}
                    placeholder="Built a full-stack web app using React and Node.js that reduces resume creation time by 80%..."
                    value={proj.description}
                    onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)}
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
