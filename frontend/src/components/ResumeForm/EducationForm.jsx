import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const EMPTY_EDU = { institution: '', degree: '', year: '' };

export default function EducationForm() {
  const { resumeData, updateArrayItem, addArrayItem, removeArrayItem } = useResume();
  const { education } = resumeData;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-base">Education</h3>
          <p className="text-white/45 text-xs mt-0.5">Add your academic background.</p>
        </div>
        <button
          onClick={() => addArrayItem('education', { ...EMPTY_EDU })}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] rounded-lg hover:bg-[rgba(99,102,241,0.2)] hover:border-[rgba(99,102,241,0.4)] hover:text-white transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus size={13} /> Add
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="form-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.04]">
              <p className="text-sm font-semibold text-white/90 tracking-wide">
                {edu.institution || `Education ${idx + 1}`}
              </p>
              <button
                onClick={() => removeArrayItem('education', idx)}
                className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Institution</label>
                <input
                  className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm"
                  placeholder="MIT, Stanford University…"
                  value={edu.institution}
                  onChange={(e) => updateArrayItem('education', idx, 'institution', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Degree</label>
                <input
                  className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm"
                  placeholder="B.Sc. Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 font-semibold mb-1.5 tracking-wide">Graduation Year</label>
                <input
                  className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm"
                  placeholder="2024"
                  value={edu.year}
                  onChange={(e) => updateArrayItem('education', idx, 'year', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
