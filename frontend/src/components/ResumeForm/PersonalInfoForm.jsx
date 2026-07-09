import { useResume } from '../../context/ResumeContext';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const fields = [
    { key: 'fullName',  label: 'Full Name',       placeholder: 'John Doe',                   colSpan: 2 },
    { key: 'headline',  label: 'Professional Headline', placeholder: 'Full Stack Developer', colSpan: 2 },
    { key: 'email',     label: 'Email',            placeholder: 'john@example.com',           colSpan: 1 },
    { key: 'phone',     label: 'Phone',            placeholder: '+1 (555) 000-0000',          colSpan: 1 },
    { key: 'location',  label: 'Location',         placeholder: 'New York, NY',               colSpan: 1 },
    { key: 'linkedin',  label: 'LinkedIn',         placeholder: 'linkedin.com/in/username',   colSpan: 1 },
    { key: 'github',    label: 'GitHub',           placeholder: 'github.com/username',        colSpan: 1 },
    { key: 'portfolio', label: 'Portfolio / Website', placeholder: 'yoursite.dev',            colSpan: 1 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-white font-semibold text-base">Personal Information</h3>
        <p className="text-white/45 text-xs mt-0.5">Your basic contact and identity details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder, colSpan }) => (
          <div key={key} className={colSpan === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1'}>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 tracking-wide">{label}</label>
            <input
              type={key === 'email' ? 'email' : 'text'}
              value={personalInfo[key] || ''}
              onChange={(e) => updatePersonalInfo(key, e.target.value)}
              placeholder={placeholder}
              className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
