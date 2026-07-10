/**
 * Classic Resume Template — Refined single-column design with elegant typography.
 * Inspired by Harvard/traditional formats with premium serif-inspired feel.
 */

export default function ClassicTemplate({ data }) {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
  } = data;

  return (
    <div
      className="resume-paper w-full min-h-[1056px] font-['Inter',sans-serif] text-sm"
      style={{ color: '#1C1C1E', background: '#fff', padding: '44px 52px' }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#1C1C1E',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.headline && (
          <p style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 500, letterSpacing: '0.5px', marginBottom: 10 }}>
            {personalInfo.headline}
          </p>
        )}
        {/* Thin double-rule accent line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: '10px 0' }}>
          <div style={{ flex: 1, maxWidth: 60, height: 1, background: '#1C1C1E' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1C1C1E' }} />
          <div style={{ flex: 1, maxWidth: 60, height: 1, background: '#1C1C1E' }} />
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '4px 0',
            fontSize: 10.5,
            color: '#4A4A4A',
          }}
        >
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin,
            personalInfo.github,
            personalInfo.portfolio,
          ]
            .filter(Boolean)
            .map((item, i, arr) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>{item}</span>
                {i < arr.length - 1 && (
                  <span style={{ margin: '0 8px', color: '#BDBDBD' }}>|</span>
                )}
              </span>
            ))}
        </div>
      </div>

      {/* ── Summary ─────────────────────────────────────────────────── */}
      {summary && (
        <ClassicSection title="Professional Summary">
          <p style={{ color: '#3D3D3D', lineHeight: 1.7, fontSize: 12 }}>{summary}</p>
        </ClassicSection>
      )}

      {/* ── Experience ──────────────────────────────────────────────── */}
      {experience.some((e) => e.company || e.role) && (
        <ClassicSection title="Professional Experience">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {experience.map((exp, i) =>
              exp.company || exp.role ? (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#1C1C1E', fontSize: 12.5 }}>{exp.role}</span>
                      {exp.company && (
                        <span style={{ color: '#555', fontSize: 12, fontWeight: 400 }}> — {exp.company}</span>
                      )}
                    </div>
                    {exp.duration && (
                      <span
                        style={{
                          fontSize: 10.5,
                          color: '#777',
                          whiteSpace: 'nowrap',
                          marginLeft: 8,
                          fontStyle: 'italic',
                        }}
                      >
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  {exp.highlights?.filter(Boolean).length > 0 && (
                    <ul style={{ paddingLeft: 0, margin: '4px 0 0 0', listStyle: 'none' }}>
                      {exp.highlights.filter(Boolean).map((h, j) => (
                        <li
                          key={j}
                          style={{
                            fontSize: 11.5,
                            color: '#444',
                            lineHeight: 1.65,
                            paddingLeft: 14,
                            position: 'relative',
                            marginBottom: 2,
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '0.45em',
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              background: '#1C1C1E',
                              display: 'inline-block',
                            }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null
            )}
          </div>
        </ClassicSection>
      )}

      {/* ── Education ───────────────────────────────────────────────── */}
      {education.some((e) => e.institution) && (
        <ClassicSection title="Education">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {education.map((edu, i) =>
              edu.institution ? (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#1C1C1E', fontSize: 12 }}>{edu.degree}</span>
                    {edu.institution && (
                      <span style={{ color: '#555', fontSize: 11.5 }}> — {edu.institution}</span>
                    )}
                  </div>
                  {edu.year && (
                    <span style={{ fontSize: 10.5, color: '#777', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: 8 }}>
                      {edu.year}
                    </span>
                  )}
                </div>
              ) : null
            )}
          </div>
        </ClassicSection>
      )}

      {/* ── Skills ──────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <ClassicSection title="Core Competencies">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ fontSize: 11.5, color: '#3D3D3D' }}>
                {skill}{i < skills.length - 1 && <span style={{ color: '#BDBDBD', margin: '0 8px' }}>•</span>}
              </span>
            ))}
          </div>
        </ClassicSection>
      )}

      {/* ── Projects ────────────────────────────────────────────────── */}
      {projects.some((p) => p.name) && (
        <ClassicSection title="Projects">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projects.map((proj, i) =>
              proj.name ? (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontWeight: 700, color: '#1C1C1E', fontSize: 12 }}>{proj.name}</span>
                    {proj.link && (
                      <span style={{ fontSize: 10, color: '#888' }}>{proj.link}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: 11.5, color: '#444', marginTop: 2, lineHeight: 1.6 }}>{proj.description}</p>
                  )}
                </div>
              ) : null
            )}
          </div>
        </ClassicSection>
      )}

      {/* ── Certifications & Languages ──────────────────────────────── */}
      {(certifications?.length > 0 || languages?.length > 0) && (
        <div style={{ display: 'flex', gap: 32 }}>
          {certifications?.length > 0 && (
            <div style={{ flex: 1 }}>
              <ClassicSection title="Certifications">
                <p style={{ fontSize: 11.5, color: '#3D3D3D', lineHeight: 1.65 }}>
                  {certifications.join(' • ')}
                </p>
              </ClassicSection>
            </div>
          )}
          {languages?.length > 0 && (
            <div style={{ flex: 1 }}>
              <ClassicSection title="Languages">
                <p style={{ fontSize: 11.5, color: '#3D3D3D', lineHeight: 1.65 }}>
                  {languages.join(' • ')}
                </p>
              </ClassicSection>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ClassicSection({ title, children }) {
  return (
    <section style={{ marginBottom: 18 }}>
      <div style={{ marginBottom: 8 }}>
        <h2
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#1C1C1E',
            marginBottom: 4,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            height: 1.5,
            background: 'linear-gradient(90deg, #1C1C1E 0%, #9E9E9E 60%, transparent 100%)',
          }}
        />
      </div>
      {children}
    </section>
  );
}
