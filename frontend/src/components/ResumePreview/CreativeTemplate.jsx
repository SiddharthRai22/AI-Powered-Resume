/**
 * Creative Resume Template — Bold color blocks with modern asymmetric layout.
 * Strong visual identity with gradient header and colored section markers.
 */

export default function CreativeTemplate({ data }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  return (
    <div className="resume-paper w-full min-h-[1056px] font-['Inter',sans-serif] text-sm overflow-hidden">

      {/* ── Header Block ─────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }} className="px-8 py-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[32px] font-black tracking-tight leading-none">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.headline && (
              <p style={{ color: '#4f6ef7' }} className="text-base font-semibold mt-2">
                {personalInfo.headline}
              </p>
            )}
          </div>
          {/* Decorative element */}
          <div style={{ background: 'rgba(79,110,247,0.2)', border: '1px solid rgba(79,110,247,0.4)' }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black"
            style2="color:#4f6ef7">
            <span style={{ color: '#4f6ef7', fontSize: '28px', fontWeight: 900 }}>
              {personalInfo.fullName?.[0] || 'R'}
            </span>
          </div>
        </div>

        {/* Contact strip */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} className="flex flex-wrap gap-x-6 gap-y-1 mt-5 pt-4 text-xs text-white/70">
          {personalInfo.email && <ContactItem icon="✉">{personalInfo.email}</ContactItem>}
          {personalInfo.phone && <ContactItem icon="📞">{personalInfo.phone}</ContactItem>}
          {personalInfo.location && <ContactItem icon="📍">{personalInfo.location}</ContactItem>}
          {personalInfo.linkedin && <ContactItem icon="in">{personalInfo.linkedin}</ContactItem>}
          {personalInfo.github && <ContactItem icon="⌥">{personalInfo.github}</ContactItem>}
          {personalInfo.portfolio && <ContactItem icon="🌐">{personalInfo.portfolio}</ContactItem>}
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="flex">

        {/* Main column */}
        <div className="flex-1 px-7 py-6 space-y-5 bg-white">
          {summary && (
            <Section color="#4f6ef7" title="About Me">
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </Section>
          )}

          {experience.some((e) => e.company || e.role) && (
            <Section color="#7c4dff" title="Experience">
              <div className="space-y-4">
                {experience.map((exp, i) =>
                  exp.company || exp.role ? (
                    <div key={i} className="pl-3" style={{ borderLeft: '2px solid #7c4dff' }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-[#1a1a2e]">{exp.role}</p>
                          <p className="text-xs font-medium" style={{ color: '#7c4dff' }}>{exp.company}</p>
                        </div>
                        {exp.duration && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium whitespace-nowrap">
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      {exp.highlights?.filter(Boolean).length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.highlights.filter(Boolean).map((h, j) => (
                            <li key={j} className="text-gray-600 text-xs leading-relaxed flex gap-1.5">
                              <span style={{ color: '#7c4dff' }}>→</span> {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </Section>
          )}

          {projects.some((p) => p.name) && (
            <Section color="#06b6d4" title="Projects">
              <div className="space-y-3">
                {projects.map((proj, i) =>
                  proj.name ? (
                    <div key={i} className="p-3 rounded-lg" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#0c4a6e]">{proj.name}</p>
                        {proj.link && <span className="text-[10px] text-cyan-600">{proj.link}</span>}
                      </div>
                      {proj.description && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{proj.description}</p>}
                    </div>
                  ) : null
                )}
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-52 px-5 py-6 space-y-5" style={{ background: '#f8fafc', borderLeft: '1px solid #f1f5f9' }}>
          {education.some((e) => e.institution) && (
            <SideSection title="Education">
              {education.map((edu, i) =>
                edu.institution ? (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-xs text-[#1a1a2e]">{edu.degree}</p>
                    <p className="text-[10px] text-gray-500">{edu.institution}</p>
                    {edu.year && <p className="text-[10px] text-gray-400">{edu.year}</p>}
                  </div>
                ) : null
              )}
            </SideSection>
          )}

          {skills.length > 0 && (
            <SideSection title="Skills">
              <div className="space-y-1.5">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4f6ef7' }} />
                    <span className="text-xs text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {certifications?.length > 0 && (
            <SideSection title="Certifications">
              {certifications.map((c, i) => (
                <p key={i} className="text-xs text-gray-700 mb-1">• {c}</p>
              ))}
            </SideSection>
          )}

          {languages?.length > 0 && (
            <SideSection title="Languages">
              {languages.map((l, i) => (
                <p key={i} className="text-xs text-gray-700 mb-1">• {l}</p>
              ))}
            </SideSection>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <section className="mb-1">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
        <h2 className="text-xs font-black uppercase tracking-widest" style={{ color }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SideSection({ title, children }) {
  return (
    <section>
      <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">{title}</h2>
      {children}
    </section>
  );
}

function ContactItem({ icon, children }) {
  return (
    <span className="flex items-center gap-1">
      <span>{icon}</span> {children}
    </span>
  );
}
