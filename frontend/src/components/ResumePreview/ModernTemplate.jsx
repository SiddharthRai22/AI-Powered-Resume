/**
 * Modern Resume Template — Premium two-column layout with vibrant accent sidebar.
 * Sophisticated dark header, floating skill tags, and clean typographic rhythm.
 */

export default function ModernTemplate({ data }) {
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

  const ACCENT = '#2563EB'; // royal blue
  const DARK   = '#0F172A'; // near black

  return (
    <div
      className="resume-paper w-full min-h-[1056px] font-['Inter',sans-serif] text-sm overflow-hidden"
      style={{ color: DARK, background: '#fff' }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{ background: DARK, padding: '32px 40px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.5px',
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.headline && (
              <p style={{ fontSize: 13, color: ACCENT, fontWeight: 600, letterSpacing: '0.2px' }}>
                {personalInfo.headline}
              </p>
            )}
          </div>
          {/* Initials badge */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: `${ACCENT}22`,
              border: `1.5px solid ${ACCENT}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: ACCENT, lineHeight: 1 }}>
              {personalInfo.fullName?.[0] || 'R'}
            </span>
          </div>
        </div>

        {/* Contact bar */}
        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 20px',
          }}
        >
          {[
            { icon: '✉', val: personalInfo.email },
            { icon: '📞', val: personalInfo.phone },
            { icon: '📍', val: personalInfo.location },
            { icon: 'in', val: personalInfo.linkedin },
            { icon: '⌥', val: personalInfo.github },
            { icon: '🌐', val: personalInfo.portfolio },
          ]
            .filter((x) => x.val)
            .map((x, i) => (
              <span key={i} style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: ACCENT }}>{x.icon}</span>
                {x.val}
              </span>
            ))}
        </div>
      </div>

      {/* Accent rule */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${ACCENT} 0%, #7C3AED 100%)` }} />

      {/* ── Body (two columns) ───────────────────────────────────────── */}
      <div style={{ display: 'flex' }}>

        {/* ── Main content ─────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Summary */}
          {summary && (
            <section>
              <ModernSectionTitle accent={ACCENT}>Professional Summary</ModernSectionTitle>
              <p style={{ color: '#374151', lineHeight: 1.7, fontSize: 12 }}>{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.some((e) => e.company || e.role) && (
            <section>
              <ModernSectionTitle accent={ACCENT}>Work Experience</ModernSectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map((exp, i) =>
                  exp.company || exp.role ? (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                        <div>
                          <h3 style={{ fontWeight: 700, color: DARK, fontSize: 12.5 }}>{exp.role}</h3>
                          {exp.company && (
                            <p style={{ fontSize: 11, color: ACCENT, fontWeight: 600, marginTop: 1 }}>{exp.company}</p>
                          )}
                        </div>
                        {exp.duration && (
                          <span
                            style={{
                              fontSize: 10,
                              color: '#6B7280',
                              whiteSpace: 'nowrap',
                              marginLeft: 8,
                              background: '#F3F4F6',
                              padding: '2px 8px',
                              borderRadius: 99,
                              fontWeight: 500,
                            }}
                          >
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      {exp.highlights?.filter(Boolean).length > 0 && (
                        <ul style={{ marginTop: 6, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {exp.highlights.filter(Boolean).map((h, j) => (
                            <li key={j} style={{ display: 'flex', gap: 8, fontSize: 11.5, color: '#4B5563', lineHeight: 1.6 }}>
                              <span style={{ color: ACCENT, flexShrink: 0, marginTop: 1, fontWeight: 700, fontSize: 10 }}>▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.some((p) => p.name) && (
            <section>
              <ModernSectionTitle accent={ACCENT}>Projects</ModernSectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {projects.map((proj, i) =>
                  proj.name ? (
                    <div
                      key={i}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: '#F8FAFF',
                        borderLeft: `3px solid ${ACCENT}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontWeight: 700, color: DARK, fontSize: 12 }}>{proj.name}</h3>
                        {proj.link && (
                          <span style={{ fontSize: 10, color: ACCENT }}>{proj.link}</span>
                        )}
                      </div>
                      {proj.description && (
                        <p style={{ fontSize: 11, color: '#6B7280', marginTop: 3, lineHeight: 1.6 }}>{proj.description}</p>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <div
          style={{
            width: 200,
            background: '#F8FAFC',
            borderLeft: '1px solid #E5E7EB',
            padding: '24px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Education */}
          {education.some((e) => e.institution) && (
            <section>
              <SidebarTitle dark={DARK}>Education</SidebarTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {education.map((edu, i) =>
                  edu.institution ? (
                    <div key={i}>
                      <p style={{ fontWeight: 700, fontSize: 11, color: DARK, lineHeight: 1.4 }}>{edu.degree}</p>
                      <p style={{ fontSize: 10.5, color: '#6B7280', marginTop: 1 }}>{edu.institution}</p>
                      {edu.year && (
                        <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{edu.year}</p>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <SidebarTitle dark={DARK}>Skills</SidebarTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 99,
                      background: `${ACCENT}12`,
                      color: ACCENT,
                      border: `1px solid ${ACCENT}25`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <SidebarTitle dark={DARK}>Certifications</SidebarTitle>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {certifications.map((c, i) => (
                  <li key={i} style={{ fontSize: 10.5, color: '#4B5563', display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <SidebarTitle dark={DARK}>Languages</SidebarTitle>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {languages.map((l, i) => (
                  <li key={i} style={{ fontSize: 10.5, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span
                      style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0 }}
                    />
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function ModernSectionTitle({ children, accent }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h2 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: accent }}>
        {children}
      </h2>
      <div style={{ height: 1.5, background: `linear-gradient(90deg, ${accent} 0%, ${accent}30 60%, transparent 100%)`, marginTop: 4 }} />
    </div>
  );
}

function SidebarTitle({ children, dark }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h2 style={{ fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: dark }}>
        {children}
      </h2>
      <div style={{ height: 1, background: '#E5E7EB', marginTop: 4 }} />
    </div>
  );
}
