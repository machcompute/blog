interface ProseProps {
  html: string;
}

export default function Prose({ html }: ProseProps) {
  return (
    <div className="prose-mc mt-10" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
