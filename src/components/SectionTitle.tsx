export function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-wine/80">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {text && <p className="mt-3 max-w-2xl text-base text-[#6c4d4b]">{text}</p>}
    </div>
  );
}
