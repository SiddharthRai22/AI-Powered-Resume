import { Plus, Trash2, GraduationCap, Award, Calendar } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const EMPTY_EDU = { institution: '', degree: '', year: '' };

export default function EducationForm() {
  const { resumeData, updateArrayItem, addArrayItem, removeArrayItem } = useResume();
  const { education } = resumeData;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
            <GraduationCap size={18} />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-lg tracking-tight">Education</h3>
            <p className="text-white/40 text-xs mt-0.5">Add your academic background details.</p>
          </div>
        </div>
        <button
          onClick={() => addArrayItem('education', { ...EMPTY_EDU })}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-500/80 to-purple-600/80 hover:from-brand-500 hover:to-purple-600 border border-brand-400/30 hover:border-brand-400/50 rounded-lg transition-all cursor-pointer shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transform hover:-translate-y-0.5"
        >
          <Plus size={13} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="form-card rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <GraduationCap size={14} className="text-brand-400/70" />
                <p className="text-sm font-semibold text-white/90 tracking-wide">
                  {edu.institution || `Education ${idx + 1}`}
                </p>
              </div>
              <button
                onClick={() => removeArrayItem('education', idx)}
                className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                  <label className="text-[10px] font-bold text-white/45 tracking-widest uppercase">Institution</label>
                  <div className="relative">
                    <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                      placeholder="MIT, Stanford University…"
                      value={edu.institution}
                      onChange={(e) => updateArrayItem('education', idx, 'institution', e.target.value)}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/45 tracking-widest uppercase">Degree</label>
                  <div className="relative">
                    <Award size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                      placeholder="B.Sc. Computer Science"
                      value={edu.degree}
                      onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/45 tracking-widest uppercase">Graduation Year</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      className="input-dark w-full pr-4 py-3 rounded-xl text-sm"
                      placeholder="2024"
                      value={edu.year}
                      onChange={(e) => updateArrayItem('education', idx, 'year', e.target.value)}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
