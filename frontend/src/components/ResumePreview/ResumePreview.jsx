import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import CreativeTemplate from './CreativeTemplate';

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
};

/**
 * Renders the selected resume template.
 * When scale=1, renders at full A4 size (794px wide).
 * The parent container is responsible for scaling/containing.
 */
export default function ResumePreview({ data, templateId = 'modern', scale = 1 }) {
  const Template = TEMPLATES[templateId] || TEMPLATES.modern;

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <div
        style={{
          width: 794,
          minHeight: 1056,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}
