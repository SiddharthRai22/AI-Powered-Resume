/**
 * Modern Resume Template — Clean sidebar layout with accent color header.
 * Two-column design with skill tags and modern typography.
 */

export default function ModernTemplate({ data }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  return (
    <div className="resume-paper w-full min-h-[1056px] text-[#1a1a2e] font-['Inter',sans-serif] text-sm">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="bg-[#1a1a2e] text-white px-8 py-7">
        <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.headline && (
          <p className="text-[#4f6ef7] font-medium mt-1 text-base">{personalInfo.headline}</p>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm text-white/75">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>in {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>⌥ {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* ── Body (two columns) ───────────────────────────────────────── */}
      <div className="flex">
        {/* Left main content */}
        <div className="flex-1 px-7 py-6 space-y-5">

          {/* Summary */}
          {summary && (
            <section>
              <SectionTitle>Professional Summary</SectionTitle>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.some((e) => e.company || e.role) && (
            <section>
              <SectionTitle>Work Experience</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  exp.company || exp.role ? (
                    <div key={i}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#1a1a2e]">{exp.role}</h3>
                          <p className="text-[#4f6ef7] font-medium text-xs mt-0.5">{exp.company}</p>
                        </div>
                        {exp.duration && (
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{exp.duration}</span>
                        )}
                      </div>
                      {exp.highlights?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.highlights.filter(Boolean).map((h, j) => (
                            <li key={j} className="flex gap-2 text-gray-700 text-xs leading-relaxed">
                              <span className="text-[#4f6ef7] mt-0.5 flex-shrink-0">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.some((p) => p.name) && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3">
                {projects.map((proj, i) =>
                  proj.name ? (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#1a1a2e]">{proj.name}</h3>
                        {proj.link && (
                          <span className="text-[#4f6ef7] text-xs">↗ {proj.link}</span>
                        )}
                      </div>
                      {proj.description && (
                        <p className="text-gray-700 text-xs mt-0.5 leading-relaxed">{proj.description}</p>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-56 bg-gray-50 px-5 py-6 space-y-5 border-l border-gray-100">

          {/* Education */}
          {education.some((e) => e.institution) && (
            <section>
              <SidebarTitle>Education</SidebarTitle>
              <div className="space-y-3">
                {education.map((edu, i) =>
                  edu.institution ? (
                    <div key={i}>
                      <p className="font-semibold text-xs text-[#1a1a2e]">{edu.degree}</p>
                      <p className="text-gray-600 text-xs">{edu.institution}</p>
                      {edu.year && <p className="text-gray-400 text-xs">{edu.year}</p>}
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <SidebarTitle>Skills</SidebarTitle>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#1a1a2e]/10 text-[#1a1a2e] text-xs rounded-md font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <SidebarTitle>Certifications</SidebarTitle>
              <ul className="space-y-1">
                {certifications.map((c, i) => (
                  <li key={i} className="text-xs text-gray-700">• {c}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <SidebarTitle>Languages</SidebarTitle>
              <ul className="space-y-1">
                {languages.map((l, i) => (
                  <li key={i} className="text-xs text-gray-700">• {l}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-2">
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#4f6ef7]">{children}</h2>
      <div className="h-px bg-[#4f6ef7]/30 mt-1" />
    </div>
  );
}

function SidebarTitle({ children }) {
  return (
    <div className="mb-2">
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a2e]">{children}</h2>
      <div className="h-px bg-gray-300 mt-1" />
    </div>
  );
}
