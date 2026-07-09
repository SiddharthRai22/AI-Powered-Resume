/**
 * Classic Resume Template — Traditional single-column design.
 * Clean serif-inspired look with clean dividers.
 */

export default function ClassicTemplate({ data }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  return (
    <div className="resume-paper w-full min-h-[1056px] text-[#1a1a1a] font-['Inter',sans-serif] text-sm px-10 py-8">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="text-center border-b-2 border-[#1a1a1a] pb-4 mb-5">
        <h1 className="text-3xl font-black tracking-tight uppercase">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.headline && (
          <p className="text-gray-600 mt-1 text-sm font-medium">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>| {personalInfo.github}</span>}
        </div>
      </div>

      {/* ── Summary ─────────────────────────────────────────────────── */}
      {summary && (
        <Section title="Objective / Summary">
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* ── Experience ──────────────────────────────────────────────── */}
      {experience.some((e) => e.company || e.role) && (
        <Section title="Professional Experience">
          <div className="space-y-4">
            {experience.map((exp, i) =>
              exp.company || exp.role ? (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-[#1a1a1a]">{exp.role}</span>
                      {exp.company && <span className="text-gray-700"> — {exp.company}</span>}
                    </div>
                    {exp.duration && <span className="text-xs text-gray-500">{exp.duration}</span>}
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5 pl-3">
                      {exp.highlights.filter(Boolean).map((h, j) => (
                        <li key={j} className="list-disc text-gray-700 text-xs leading-relaxed">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null
            )}
          </div>
        </Section>
      )}

      {/* ── Education ───────────────────────────────────────────────── */}
      {education.some((e) => e.institution) && (
        <Section title="Education">
          <div className="space-y-2">
            {education.map((edu, i) =>
              edu.institution ? (
                <div key={i} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[#1a1a1a]">{edu.degree}</span>
                    {edu.institution && <span className="text-gray-700"> — {edu.institution}</span>}
                  </div>
                  {edu.year && <span className="text-xs text-gray-500">{edu.year}</span>}
                </div>
              ) : null
            )}
          </div>
        </Section>
      )}

      {/* ── Skills ──────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <Section title="Skills">
          <p className="text-gray-700 leading-relaxed">{skills.join(' • ')}</p>
        </Section>
      )}

      {/* ── Projects ────────────────────────────────────────────────── */}
      {projects.some((p) => p.name) && (
        <Section title="Projects">
          <div className="space-y-2">
            {projects.map((proj, i) =>
              proj.name ? (
                <div key={i}>
                  <span className="font-bold text-[#1a1a1a]">{proj.name}</span>
                  {proj.link && <span className="text-gray-500 text-xs ml-2">({proj.link})</span>}
                  {proj.description && <p className="text-gray-700 text-xs mt-0.5 leading-relaxed">{proj.description}</p>}
                </div>
              ) : null
            )}
          </div>
        </Section>
      )}

      {/* ── Certifications & Languages ───────────────────────────────── */}
      {(certifications?.length > 0 || languages?.length > 0) && (
        <div className="flex gap-8">
          {certifications?.length > 0 && (
            <div className="flex-1">
              <Section title="Certifications">
                <p className="text-gray-700">{certifications.join(' • ')}</p>
              </Section>
            </div>
          )}
          {languages?.length > 0 && (
            <div className="flex-1">
              <Section title="Languages">
                <p className="text-gray-700">{languages.join(' • ')}</p>
              </Section>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-4">
      <h2 className="text-xs font-black uppercase tracking-widest text-[#1a1a1a] border-b border-gray-300 pb-0.5 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
