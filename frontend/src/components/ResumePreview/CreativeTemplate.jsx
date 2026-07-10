/**
 * Creative Resume Template — Bold, expressive design with vibrant gradients.
 * A standout layout that merges artistry with professionalism.
 */

export default function CreativeTemplate({ data }) {
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

  const PURPLE  = '#7C3AED';
  const INDIGO  = '#4F46E5';
  const TEAL    = '#0D9488';
  const DARK    = '#0F172A';

  return (
    <div
      className="resume-paper w-full min-h-[1056px] font-['Inter',sans-serif] text-sm overflow-hidden"
      style={{ color: DARK, background: '#fff' }}
    >
      {/* ── Gradient Header ─────────────────────────────────────────── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${DARK} 0%, #1E1B4B 55%, #312E81 100%)`,
          padding: '32px 40px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `${PURPLE}25`,
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -10,
            left: '40%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `${TEAL}20`,
            filter: 'blur(16px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-1px',
                lineHeight: 1.05,
                marginBottom: 6,
              }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.headline && (
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  background: `linear-gradient(90deg, #A78BFA, #67E8F9)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {personalInfo.headline}
              </p>
            )}
          </div>

          {/* Initials circle */}
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${PURPLE} 0%, ${INDIGO} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 0 0 3px rgba(167,139,250,0.3)`,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
              {personalInfo.fullName?.[0] || 'R'}
            </span>
          </div>
        </div>

        {/* Contact row */}
        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px 18px',
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
              <span key={i} style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ color: '#A78BFA' }}>{x.icon}</span>
                {x.val}
              </span>
            ))}
        </div>
      </div>

      {/* Rainbow accent bar */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${PURPLE} 0%, ${INDIGO} 35%, ${TEAL} 100%)`,
        }}
      />

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex' }}>
        {/* ── Main column ─────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* About */}
          {summary && (
            <section>
              <CreativeSectionTitle color={INDIGO}>About Me</CreativeSectionTitle>
              <p style={{ color: '#374151', lineHeight: 1.75, fontSize: 12 }}>{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.some((e) => e.company || e.role) && (
            <section>
              <CreativeSectionTitle color={PURPLE}>Experience</CreativeSectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map((exp, i) =>
                  exp.company || exp.role ? (
                    <div
                      key={i}
                      style={{
                        paddingLeft: 12,
                        borderLeft: `2.5px solid ${PURPLE}`,
                        position: 'relative',
                      }}
                    >
                      {/* Timeline dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: -5,
                          top: 4,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: PURPLE,
                          border: '2px solid #fff',
                          boxShadow: `0 0 0 1px ${PURPLE}`,
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 12.5, color: DARK }}>{exp.role}</p>
                          {exp.company && (
                            <p style={{ fontSize: 11, fontWeight: 600, color: PURPLE, marginTop: 1 }}>{exp.company}</p>
                          )}
                        </div>
                        {exp.duration && (
                          <span
                            style={{
                              fontSize: 9.5,
                              fontWeight: 600,
                              color: '#7C3AED',
                              background: '#F5F3FF',
                              border: `1px solid ${PURPLE}25`,
                              padding: '2px 8px',
                              borderRadius: 99,
                              whiteSpace: 'nowrap',
                              marginLeft: 8,
                            }}
                          >
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      {exp.highlights?.filter(Boolean).length > 0 && (
                        <ul style={{ marginTop: 5, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {exp.highlights.filter(Boolean).map((h, j) => (
                            <li key={j} style={{ display: 'flex', gap: 7, fontSize: 11.5, color: '#4B5563', lineHeight: 1.6 }}>
                              <span style={{ color: PURPLE, flexShrink: 0, fontWeight: 700 }}>→</span>
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
              <CreativeSectionTitle color={TEAL}>Projects</CreativeSectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {projects.map((proj, i) =>
                  proj.name ? (
                    <div
                      key={i}
                      style={{
                        background: '#F0FDFA',
                        border: `1px solid #99F6E4`,
                        borderRadius: 8,
                        padding: '8px 12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: 12, color: '#0F766E' }}>{proj.name}</p>
                        {proj.link && (
                          <span style={{ fontSize: 9.5, color: TEAL }}>{proj.link}</span>
                        )}
                      </div>
                      {proj.description && (
                        <p style={{ fontSize: 11, color: '#374151', marginTop: 3, lineHeight: 1.6 }}>{proj.description}</p>
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
            width: 198,
            background: '#FAFAFA',
            borderLeft: '1px solid #F1F5F9',
            padding: '24px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Education */}
          {education.some((e) => e.institution) && (
            <section>
              <CreativeSideTitle>Education</CreativeSideTitle>
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
              <CreativeSideTitle>Skills</CreativeSideTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${PURPLE}, ${INDIGO})`,
                      }}
                    />
                    <span style={{ fontSize: 11, color: '#374151' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <CreativeSideTitle>Certifications</CreativeSideTitle>
              {certifications.map((c, i) => (
                <p key={i} style={{ fontSize: 10.5, color: '#4B5563', marginBottom: 4, display: 'flex', gap: 5 }}>
                  <span style={{ color: TEAL, fontWeight: 700 }}>✓</span>
                  <span>{c}</span>
                </p>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <CreativeSideTitle>Languages</CreativeSideTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {languages.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 99,
                      background: '#EEF2FF',
                      color: INDIGO,
                      border: `1px solid ${INDIGO}25`,
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function CreativeSectionTitle({ children, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
        <h2 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', color }}>
          {children}
        </h2>
      </div>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${color}50 0%, transparent 100%)` }} />
    </div>
  );
}

function CreativeSideTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: 9,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: '#9CA3AF',
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 4,
        marginBottom: 8,
      }}
    >
      {children}
    </h2>
  );
}
