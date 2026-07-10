/**
 * Minimalist Resume Template — Ultra-refined, editorial design with generous white space.
 * Inspired by premium editorial layouts with a subtle left rule system and delicate typography.
 */

export default function MinimalistTemplate({ data }) {
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
      className="resume-paper w-full min-h-[1056px] font-['Inter',sans-serif]"
      style={{ color: '#111827', background: '#fff', padding: '52px 60px' }}
    >
      {/* ── Name & Title ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 300,
            letterSpacing: '-1px',
            color: '#111827',
            marginBottom: 4,
            lineHeight: 1.1,
          }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.headline && (
          <p
            style={{
              fontSize: 12,
              color: '#6B7280',
              fontWeight: 400,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {personalInfo.headline}
          </p>
        )}
        {/* Single thin accent line */}
        <div style={{ height: 1, background: '#111827', marginBottom: 10 }} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3px 16px',
            fontSize: 10.5,
            color: '#9CA3AF',
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
            .map((item, i) => (
              <span key={i}>{item}</span>
            ))}
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────────────── */}
      {summary && (
        <MinRow label="About">
          <p style={{ color: '#4B5563', lineHeight: 1.75, fontSize: 12, fontWeight: 300 }}>{summary}</p>
        </MinRow>
      )}

      {experience.some((e) => e.company || e.role) && (
        <MinRow label="Experience">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {experience.map((exp, i) =>
              exp.company || exp.role ? (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 12.5, color: '#111827', marginBottom: 1 }}>{exp.role}</p>
                      {exp.company && (
                        <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 400 }}>{exp.company}</p>
                      )}
                    </div>
                    {exp.duration && (
                      <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: 8 }}>
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  {exp.highlights?.filter(Boolean).length > 0 && (
                    <ul style={{ marginTop: 6, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {exp.highlights.filter(Boolean).map((h, j) => (
                        <li
                          key={j}
                          style={{
                            fontSize: 11.5,
                            color: '#4B5563',
                            lineHeight: 1.65,
                            paddingLeft: 14,
                            position: 'relative',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '0.6em',
                              width: 4,
                              height: 1,
                              background: '#9CA3AF',
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
        </MinRow>
      )}

      {education.some((e) => e.institution) && (
        <MinRow label="Education">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {education.map((edu, i) =>
              edu.institution ? (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 12, color: '#111827' }}>{edu.degree}</p>
                    <p style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>{edu.institution}</p>
                  </div>
                  {edu.year && (
                    <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: 8 }}>
                      {edu.year}
                    </span>
                  )}
                </div>
              ) : null
            )}
          </div>
        </MinRow>
      )}

      {skills.length > 0 && (
        <MinRow label="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  fontSize: 11,
                  color: '#374151',
                  border: '1px solid #D1D5DB',
                  padding: '2px 10px',
                  borderRadius: 99,
                  background: '#FAFAFA',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </MinRow>
      )}

      {projects.some((p) => p.name) && (
        <MinRow label="Projects">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projects.map((proj, i) =>
              proj.name ? (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <p style={{ fontWeight: 600, fontSize: 12, color: '#111827' }}>{proj.name}</p>
                    {proj.link && (
                      <span style={{ fontSize: 10, color: '#9CA3AF' }}>{proj.link}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: 11.5, color: '#4B5563', marginTop: 2, lineHeight: 1.65 }}>{proj.description}</p>
                  )}
                </div>
              ) : null
            )}
          </div>
        </MinRow>
      )}

      {certifications?.length > 0 && (
        <MinRow label="Certifications">
          <p style={{ fontSize: 11.5, color: '#4B5563' }}>{certifications.join(' · ')}</p>
        </MinRow>
      )}

      {languages?.length > 0 && (
        <MinRow label="Languages">
          <p style={{ fontSize: 11.5, color: '#4B5563' }}>{languages.join(' · ')}</p>
        </MinRow>
      )}
    </div>
  );
}

function MinRow({ label, children }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 28,
        marginBottom: 22,
        paddingBottom: 22,
        borderBottom: '1px solid #F3F4F6',
      }}
    >
      {/* Left label column */}
      <div style={{ width: 88, flexShrink: 0, paddingTop: 2 }}>
        <p
          style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.8px',
            color: '#D1D5DB',
          }}
        >
          {label}
        </p>
      </div>
      {/* Right content column */}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
