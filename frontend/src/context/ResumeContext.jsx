import { createContext, useContext, useState, useCallback } from 'react';

// ── Default empty resume content ───────────────────────────────────────────
export const EMPTY_RESUME = {
  templateId: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  experience: [{ company: '', role: '', duration: '', highlights: [''] }],
  education: [{ institution: '', degree: '', year: '' }],
  skills: [],
  projects: [{ name: '', description: '', link: '' }],
  certifications: [],
  languages: [],
};

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(EMPTY_RESUME);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [activeTab, setActiveTab] = useState('personal');

  /** Update a top-level field (e.g. summary, skills) */
  const updateField = useCallback((field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Update a nested personalInfo field */
  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  /** Update a specific item in an array section (experience, education, projects) */
  const updateArrayItem = useCallback((section, index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  }, []);

  /** Add a new item to an array section */
  const addArrayItem = useCallback((section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  }, []);

  /** Remove an item from an array section */
  const removeArrayItem = useCallback((section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  }, []);

  /** Load an entire resume content object (e.g. from API) */
  const loadResume = useCallback((data) => {
    setResumeData({ ...EMPTY_RESUME, ...data });
    if (data.templateId) setActiveTemplate(data.templateId);
  }, []);

  /** Reset to empty state */
  const resetResume = useCallback(() => {
    setResumeData(EMPTY_RESUME);
    setActiveTemplate('modern');
    setActiveTab('personal');
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        activeTemplate,
        activeTab,
        setActiveTemplate,
        setActiveTab,
        updateField,
        updatePersonalInfo,
        updateArrayItem,
        addArrayItem,
        removeArrayItem,
        loadResume,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
