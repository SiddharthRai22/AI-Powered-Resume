import { useResume } from '../../context/ResumeContext';
import { User, Sparkles, Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const fields = [
    { key: 'fullName',  label: 'Full Name',       placeholder: 'John Doe',                   colSpan: 2, icon: User },
    { key: 'headline',  label: 'Professional Headline', placeholder: 'Full Stack Developer', colSpan: 2, icon: Sparkles },
    { key: 'email',     label: 'Email',            placeholder: 'john@example.com',           colSpan: 1, icon: Mail },
    { key: 'phone',     label: 'Phone',            placeholder: '+1 (555) 000-0000',          colSpan: 1, icon: Phone },
    { key: 'location',  label: 'Location',         placeholder: 'New York, NY',               colSpan: 1, icon: MapPin },
    { key: 'linkedin',  label: 'LinkedIn',         placeholder: 'linkedin.com/in/username',   colSpan: 1, icon: Globe },
    { key: 'github',    label: 'GitHub',           placeholder: 'github.com/username',        colSpan: 1, icon: Globe },
    { key: 'portfolio', label: 'Portfolio / Website', placeholder: 'yoursite.dev',            colSpan: 1, icon: Link2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.05]">
        <div className="p-2 bg-brand-500/10 border border-brand-500/25 rounded-lg text-brand-400">
          <User size={18} />
        </div>
        <div>
          <h3 className="text-white font-display font-bold text-lg tracking-tight">Personal Information</h3>
          <p className="text-white/40 text-xs mt-0.5">Your basic contact and professional identity details.</p>
        </div>
      </div>

      <div className="form-card rounded-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(({ key, label, placeholder, colSpan, icon: Icon }) => (
            <div key={key} className={`flex flex-col gap-1.5 ${colSpan === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}>
              <label className="text-[10px] font-bold text-white/45 tracking-wider uppercase">{label}</label>
              <div className="relative">
                <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={personalInfo[key] || ''}
                  onChange={(e) => updatePersonalInfo(key, e.target.value)}
                  placeholder={placeholder}
                  className="input-dark w-full pr-3.5 py-3 rounded-xl text-sm"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
