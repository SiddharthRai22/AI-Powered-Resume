/**
 * Minimalist Resume Template — Ultra-clean design with generous whitespace.
 * Monochrome palette with thin dividers and refined typography.
 */

export default function MinimalistTemplate({ data }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  return (
    <div className="resume-paper w-full min-h-[1056px] text-[#111827] font-['Inter',sans-serif] text-sm px-12 py-10">

      {/* ── Name + Contact ───────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-[-0.5px] text-[#111827]">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.headline && (
          <p className="text-gray-400 mt-1 text-sm font-light">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* ── Summary ─────────────────────────────────────────────────── */}
      {summary && (
        <Row label="About">
          <p className="text-gray-600 leading-relaxed font-light">{summary}</p>
        </Row>
      )}

      {/* ── Experience ──────────────────────────────────────────────── */}
      {experience.some((e) => e.company || e.role) && (
        <Row label="Experience">
          <div className="space-y-5">
            {experience.map((exp, i) =>
              exp.company || exp.role ? (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium text-[#111827]">{exp.role}</p>
                    {exp.duration && <p className="text-xs text-gray-400">{exp.duration}</p>}
                  </div>
                  {exp.company && <p className="text-xs text-gray-400 mt-0.5">{exp.company}</p>}
                  {exp.highlights?.filter(Boolean).length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.filter(Boolean).map((h, j) => (
                        <li key={j} className="text-gray-600 text-xs leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-gray-300">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null
            )}
          </div>
        </Row>
      )}

      {/* ── Education ───────────────────────────────────────────────── */}
      {education.some((e) => e.institution) && (
        <Row label="Education">
          <div className="space-y-2">
            {education.map((edu, i) =>
              edu.institution ? (
                <div key={i} className="flex justify-between items-baseline">
                  <div>
                    <p className="font-medium text-[#111827]">{edu.degree}</p>
                    <p className="text-xs text-gray-400">{edu.institution}</p>
                  </div>
                  {edu.year && <p className="text-xs text-gray-400">{edu.year}</p>}
                </div>
              ) : null
            )}
          </div>
        </Row>
      )}

      {/* ── Skills ──────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <Row label="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="text-xs text-gray-600 border border-gray-200 px-2.5 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </Row>
      )}

      {/* ── Projects ────────────────────────────────────────────────── */}
      {projects.some((p) => p.name) && (
        <Row label="Projects">
          <div className="space-y-3">
            {projects.map((proj, i) =>
              proj.name ? (
                <div key={i}>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#111827]">{proj.name}</p>
                    {proj.link && <span className="text-xs text-gray-400">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{proj.description}</p>}
                </div>
              ) : null
            )}
          </div>
        </Row>
      )}

      {certifications?.length > 0 && (
        <Row label="Certifications">
          <p className="text-gray-600 text-xs">{certifications.join(' · ')}</p>
        </Row>
      )}

      {languages?.length > 0 && (
        <Row label="Languages">
          <p className="text-gray-600 text-xs">{languages.join(' · ')}</p>
        </Row>
      )}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex gap-8 mb-6">
      <div className="w-24 flex-shrink-0 pt-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300">{label}</p>
      </div>
      <div className="flex-1 border-t border-gray-100 pt-2">{children}</div>
    </div>
  );
}
